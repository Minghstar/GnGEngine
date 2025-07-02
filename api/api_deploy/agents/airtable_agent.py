import os
import json
import re
from typing import List, Dict, Tuple, Optional
from difflib import SequenceMatcher
import requests
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Airtable configuration
AIRTABLE_API_KEY = os.environ.get("AIRTABLE_API_KEY")
AIRTABLE_BASE_ID = os.environ.get("AIRTABLE_BASE_ID")
AIRTABLE_TABLE_NAME = os.environ.get("AIRTABLE_TABLE_NAME", "Verified Athletes")

# Staff/coach keywords to filter out
STAFF_KEYWORDS = {
    "coach", "staff", "director", "manager", "trainer", "assistant", 
    "head coach", "associate", "coordinator", "administrator"
}

def _validate_airtable_credentials():
    """Validate Airtable credentials are present"""
    if not AIRTABLE_API_KEY or not AIRTABLE_BASE_ID:
        raise RuntimeError("Missing Airtable credentials. Please set AIRTABLE_API_KEY and AIRTABLE_BASE_ID in your .env file.")

def is_valid_athlete(athlete: Dict) -> bool:
    """
    Check if an athlete record is valid and should be included.
    
    Args:
        athlete: Dictionary containing athlete data
        
    Returns:
        bool: True if athlete is valid, False otherwise
    """
    # Check for required fields
    name = athlete.get('name', '').strip()
    college = athlete.get('college', '').strip()
    sport = athlete.get('sport', '').strip()
    
    if not name or not college or not sport:
        return False
    
    # Check for staff/coach keywords in name
    name_lower = name.lower()
    for keyword in STAFF_KEYWORDS:
        if keyword in name_lower:
            return False
    
    return True

def clean_name(name: str) -> str:
    """
    Clean and format athlete name to proper title case.
    
    Args:
        name: Raw name string
        
    Returns:
        str: Cleaned name in title case
    """
    if not name:
        return ""
    
    # Remove extra whitespace
    name = re.sub(r'\s+', ' ', name.strip())
    
    # Convert to title case, handling special cases
    words = name.split()
    cleaned_words = []
    
    for word in words:
        # Handle special cases like "Mc", "Mac", "O'", etc.
        if word.lower() in ['mc', 'mac', 'o']:
            cleaned_words.append(word.title())
        elif "'" in word:
            # Handle names with apostrophes
            parts = word.split("'")
            cleaned_parts = [part.title() for part in parts]
            cleaned_words.append("'".join(cleaned_parts))
        else:
            cleaned_words.append(word.title())
    
    return " ".join(cleaned_words)

def calculate_name_similarity(name1: str, name2: str) -> float:
    """
    Calculate similarity between two names using SequenceMatcher.
    
    Args:
        name1: First name
        name2: Second name
        
    Returns:
        float: Similarity score between 0 and 1
    """
    return SequenceMatcher(None, name1.lower(), name2.lower()).ratio()

def load_existing_airtable_records() -> List[Dict]:
    """
    Load existing records from Airtable for comparison.
    
    Returns:
        List[Dict]: List of existing athlete records
    """
    _validate_airtable_credentials()
    
    headers = {
        "Authorization": f"Bearer {AIRTABLE_API_KEY}",
        "Content-Type": "application/json"
    }
    
    existing_records = []
    offset = None
    
    while True:
        url = f"https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/{AIRTABLE_TABLE_NAME}"
        params = {"pageSize": 100}
        if offset:
            params["offset"] = offset
            
        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            
            data = response.json()
            records = data.get('records', [])
            
            # Extract fields from each record
            for record in records:
                fields = record.get('fields', {})
                existing_records.append({
                    'id': record['id'],
                    'name': fields.get('Name', ''),
                    'college': fields.get('College', ''),
                    'sport': fields.get('Sport', ''),
                    'hometown': fields.get('Hometown', ''),
                    'year': fields.get('Year', ''),
                    'position': fields.get('Position', '')
                })
            
            # Check if there are more pages
            offset = data.get('offset')
            if not offset:
                break
                
        except requests.exceptions.RequestException as e:
            print(f"⚠️ Warning: Could not load existing records from Airtable: {e}")
            break
    
    print(f"📊 Loaded {len(existing_records)} existing records from Airtable")
    return existing_records

def calculate_confidence_score(new_record: Dict, existing_record: Dict) -> float:
    """
    Calculate confidence score for potential match between new and existing records.
    
    Args:
        new_record: New athlete record
        existing_record: Existing athlete record from Airtable
        
    Returns:
        float: Confidence score between 0 and 100
    """
    score = 0.0
    
    # Name similarity (40% weight)
    name_similarity = calculate_name_similarity(
        new_record.get('name', ''), 
        existing_record.get('name', '')
    )
    score += name_similarity * 40
    
    # College match (30% weight)
    if new_record.get('college', '').lower() == existing_record.get('college', '').lower():
        score += 30
    
    # Sport match (20% weight)
    if new_record.get('sport', '').lower() == existing_record.get('sport', '').lower():
        score += 20
    
    # Hometown similarity (10% weight) - only if both have hometown data
    new_hometown = new_record.get('hometown', '').strip()
    existing_hometown = existing_record.get('hometown', '').strip()
    
    if new_hometown and existing_hometown:
        hometown_similarity = calculate_name_similarity(new_hometown, existing_hometown)
        score += hometown_similarity * 10
    
    return min(score, 100.0)

def classify_record(new_record: Dict, existing_records: List[Dict]) -> Tuple[str, Optional[Dict], float]:
    """
    Classify a new record as NEW, DUPLICATE, or POSSIBLE_MATCH.
    
    Args:
        new_record: New athlete record to classify
        existing_records: List of existing records from Airtable
        
    Returns:
        Tuple[str, Optional[Dict], float]: (classification, best_match, confidence_score)
    """
    best_match = None
    best_score = 0.0
    
    # Find the best matching existing record
    for existing_record in existing_records:
        score = calculate_confidence_score(new_record, existing_record)
        if score > best_score:
            best_score = score
            best_match = existing_record
    
    # Classification logic
    if best_score >= 90:
        return "DUPLICATE", best_match, best_score
    elif best_score >= 70:
        return "POSSIBLE_MATCH", best_match, best_score
    else:
        return "NEW", None, 0.0

def save_duplicates_log(possible_matches: List[Dict], log_file: str = "logs/duplicates_log.json"):
    """
    Save possible matches to a log file for manual review.
    
    Args:
        possible_matches: List of possible match records
        log_file: Path to log file
    """
    # Ensure logs directory exists
    os.makedirs(os.path.dirname(log_file), exist_ok=True)
    
    # Add timestamp to log data
    log_data = {
        "timestamp": str(datetime.now()),
        "total_possible_matches": len(possible_matches),
        "matches": possible_matches
    }
    
    with open(log_file, 'w', encoding='utf-8') as f:
        json.dump(log_data, f, indent=2, ensure_ascii=False)
    
    print(f"📝 Saved {len(possible_matches)} possible matches to {log_file}")

def run_airtable_agent(scraped_data: List[Dict]) -> Tuple[List[Dict], List[Dict], List[Dict]]:
    """
    Main function to process scraped athlete data for Airtable upload.
    
    This function:
    1. Filters out invalid entries (staff, coaches, missing required fields)
    2. Cleans up name formatting
    3. Deduplicates against existing Airtable records
    4. Classifies records as NEW, DUPLICATE, or POSSIBLE_MATCH
    5. Logs possible matches for manual review
    
    Args:
        scraped_data: List of dictionaries containing scraped athlete data
        
    Returns:
        Tuple[List[Dict], List[Dict], List[Dict]]: (new_records, duplicates, possible_matches)
    """
    print("🤖 Starting Airtable Agent...")
    print(f"📊 Processing {len(scraped_data)} scraped records")
    
    # Step 1: Filter and clean data
    valid_records = []
    filtered_count = 0
    
    for record in scraped_data:
        if is_valid_athlete(record):
            # Clean the name
            if 'name' in record:
                record['name'] = clean_name(record['name'])
            valid_records.append(record)
        else:
            filtered_count += 1
    
    print(f"✅ Filtered out {filtered_count} invalid records")
    print(f"📋 {len(valid_records)} valid records remaining")
    
    # Step 2: Load existing records from Airtable
    existing_records = load_existing_airtable_records()
    
    # Step 3: Classify records
    new_records = []
    duplicates = []
    possible_matches = []
    
    for record in valid_records:
        classification, best_match, confidence = classify_record(record, existing_records)
        
        if classification == "NEW":
            new_records.append(record)
        elif classification == "DUPLICATE":
            duplicates.append({
                "new_record": record,
                "existing_record": best_match,
                "confidence": confidence
            })
        elif classification == "POSSIBLE_MATCH":
            possible_matches.append({
                "new_record": record,
                "existing_record": best_match,
                "confidence": confidence,
                "comparison": {
                    "name_similarity": calculate_name_similarity(
                        record.get('name', ''), 
                        best_match.get('name', '')
                    ),
                    "college_match": record.get('college', '').lower() == best_match.get('college', '').lower(),
                    "sport_match": record.get('sport', '').lower() == best_match.get('sport', '').lower(),
                    "hometown_similarity": calculate_name_similarity(
                        record.get('hometown', ''), 
                        best_match.get('hometown', '')
                    ) if record.get('hometown') and best_match.get('hometown') else 0.0
                }
            })
    
    # Step 4: Save possible matches to log
    if possible_matches:
        save_duplicates_log(possible_matches)
    
    # Step 5: Print summary
    print("\n📈 Classification Summary:")
    print(f"🆕 New records: {len(new_records)}")
    print(f"🔄 Duplicates: {len(duplicates)}")
    print(f"❓ Possible matches: {len(possible_matches)}")
    
    if possible_matches:
        print(f"\n⚠️  {len(possible_matches)} possible matches saved to logs/duplicates_log.json for manual review")
    
    return new_records, duplicates, possible_matches 