#!/usr/bin/env python3
"""
FastAPI application for NCAA Athlete Data Processing and Upload.
Compatible with Python 3.11 and Pydantic v1.
"""

import sys
import os
import json
import logging
from datetime import datetime, timezone
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from agents.airtable_agent import run_airtable_agent

# Ensure logs directory exists
os.makedirs('logs', exist_ok=True)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/api.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

# Pydantic models
class AthleteRecord(BaseModel):
    name: str
    college: str
    sport: str
    position: Optional[str] = None
    year: Optional[str] = None
    hometown: Optional[str] = None
    nationality: Optional[str] = None
    height: Optional[str] = None
    high_school: Optional[str] = None
    roster_url: Optional[str] = None
    image: Optional[str] = None
    parser_version: Optional[str] = None

class CleanUploadRequest(BaseModel):
    athletes: List[AthleteRecord]

class CleanUploadResponse(BaseModel):
    success: bool
    timestamp: str
    processing_time_ms: int
    uploaded_count: int
    duplicate_count: int
    possible_match_count: int
    filtered_count: int
    uploaded_names: List[str]
    duplicate_names: List[str]
    possible_match_names: List[str]
    total_input: int
    agent_version: str

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str
    uptime: str

# Global variables
start_time = datetime.now(timezone.utc)
AGENT_VERSION = "1.0.0"

# Create FastAPI app
app = FastAPI(
    title="NCAA Athlete Data API",
    description="API for processing, cleaning, and uploading NCAA athlete data to Airtable",
    version=AGENT_VERSION
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "NCAA Athlete Data API",
        "version": AGENT_VERSION,
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    uptime = datetime.now(timezone.utc) - start_time
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now(timezone.utc).isoformat(),
        version=AGENT_VERSION,
        uptime=str(uptime)
    )

@app.post("/clean-upload", response_model=CleanUploadResponse)
async def clean_upload_athletes(request: CleanUploadRequest):
    start_processing = datetime.now(timezone.utc)
    request_id = f"req_{start_processing.strftime('%Y%m%d_%H%M%S')}_{id(request)}"
    logger.info(f"📥 [{request_id}] Processing {len(request.athletes)} athlete records")
    try:
        athletes_data = [athlete.dict() for athlete in request.athletes]
        new_records, duplicates, possible_matches = run_airtable_agent(athletes_data)
        processing_time = datetime.now(timezone.utc) - start_processing
        processing_time_ms = int(processing_time.total_seconds() * 1000)
        response = CleanUploadResponse(
            success=True,
            timestamp=datetime.now(timezone.utc).isoformat(),
            processing_time_ms=processing_time_ms,
            uploaded_count=len(new_records),
            duplicate_count=len(duplicates),
            possible_match_count=len(possible_matches),
            filtered_count=0,
            uploaded_names=[record.get('name', 'Unknown') for record in new_records],
            duplicate_names=[record.get('name', 'Unknown') for record in duplicates],
            possible_match_names=[record.get('name', 'Unknown') for record in possible_matches],
            total_input=len(request.athletes),
            agent_version=AGENT_VERSION
        )
        logger.info(f"✅ [{request_id}] Successfully processed {len(request.athletes)} records")
        return response
    except Exception as e:
        logger.error(f"❌ [{request_id}] Error processing request: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/stats")
async def get_stats():
    uptime = datetime.now(timezone.utc) - start_time
    return {
        "version": AGENT_VERSION,
        "uptime": str(uptime),
        "start_time": start_time.isoformat(),
        "status": "running"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
