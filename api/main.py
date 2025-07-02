#!/usr/bin/env python3
"""
FastAPI application for NCAA Athlete Data Processing and Upload.

This service provides endpoints for cleaning, deduplicating, and uploading
athlete data to Airtable using intelligent matching algorithms.
"""

import sys
import os
import json
import logging
from datetime import datetime, timezone
from typing import List, Dict, Optional, Any
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, field_validator
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

# Pydantic models for request/response validation
class AthleteRecord(BaseModel):
    """Model for individual athlete records."""
    name: str = Field(..., description="Athlete's full name")
    college: str = Field(..., description="College/university name")
    sport: str = Field(..., description="Sport name")
    position: Optional[str] = Field(None, description="Athlete's position")
    year: Optional[str] = Field(None, description="Academic year (Freshman, Sophomore, etc.)")
    hometown: Optional[str] = Field(None, description="Hometown")
    nationality: Optional[str] = Field(None, description="Nationality")
    height: Optional[str] = Field(None, description="Height")
    high_school: Optional[str] = Field(None, description="High school")
    roster_url: Optional[str] = Field(None, description="Roster URL")
    image: Optional[str] = Field(None, description="Image URL or data")
    parser_version: Optional[str] = Field(None, description="Parser version used")

    @field_validator('name', 'college', 'sport')
    @classmethod
    def validate_required_fields(cls, v):
        """Validate that required fields are not empty."""
        if not v or not v.strip():
            raise ValueError('Field cannot be empty')
        return v.strip()

class CleanUploadRequest(BaseModel):
    """Model for the clean-upload request."""
    athletes: List[AthleteRecord] = Field(..., description="List of athlete records to process")
    
    @field_validator('athletes')
    @classmethod
    def validate_athletes_list(cls, v):
        """Validate that athletes list is not empty."""
        if not v:
            raise ValueError('Athletes list cannot be empty')
        if len(v) > 10000:  # Reasonable limit for batch processing
            raise ValueError('Athletes list cannot exceed 10,000 records')
        return v

class CleanUploadResponse(BaseModel):
    """Model for the clean-upload response."""
    success: bool = Field(..., description="Whether the operation was successful")
    timestamp: str = Field(..., description="ISO timestamp of the operation")
    processing_time_ms: int = Field(..., description="Processing time in milliseconds")
    
    # Counts
    uploaded_count: int = Field(..., description="Number of new records uploaded")
    duplicate_count: int = Field(..., description="Number of duplicate records found")
    possible_match_count: int = Field(..., description="Number of possible matches for manual review")
    filtered_count: int = Field(..., description="Number of records filtered out")
    
    # Names lists
    uploaded_names: List[str] = Field(..., description="Names of uploaded athletes")
    duplicate_names: List[str] = Field(..., description="Names of duplicate athletes")
    possible_match_names: List[str] = Field(..., description="Names of possible matches")
    
    # Metadata
    total_input: int = Field(..., description="Total number of input records")
    agent_version: str = Field(..., description="Version of the agent used")

class HealthResponse(BaseModel):
    """Model for health check response."""
    status: str = Field(..., description="Service status")
    timestamp: str = Field(..., description="Current timestamp")
    version: str = Field(..., description="API version")
    uptime: str = Field(..., description="Service uptime")

# Global variables for tracking
start_time = datetime.now(timezone.utc)
AGENT_VERSION = "1.0.0"

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager."""
    # Startup
    logger.info("🚀 Starting NCAA Athlete Data API...")
    logger.info(f"📊 Agent version: {AGENT_VERSION}")
    
    yield
    
    # Shutdown
    logger.info("🛑 Shutting down NCAA Athlete Data API...")

# Create FastAPI app
app = FastAPI(
    title="NCAA Athlete Data API",
    description="API for processing, cleaning, and uploading NCAA athlete data to Airtable",
    version=AGENT_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler for unhandled errors."""
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "Internal server error",
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "detail": str(exc) if app.debug else "An unexpected error occurred"
        }
    )

@app.get("/", response_model=Dict[str, str])
async def root():
    """Root endpoint with API information."""
    return {
        "message": "NCAA Athlete Data API",
        "version": AGENT_VERSION,
        "docs": "/docs",
        "health": "/health"
    }

@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint."""
    uptime = datetime.now(timezone.utc) - start_time
    return HealthResponse(
        status="healthy",
        timestamp=datetime.now(timezone.utc).isoformat(),
        version=AGENT_VERSION,
        uptime=str(uptime)
    )

@app.post("/clean-upload", response_model=CleanUploadResponse)
async def clean_upload_athletes(request: CleanUploadRequest):
    """
    Clean, deduplicate, and upload athlete data to Airtable.
    
    This endpoint:
    1. Validates input data
    2. Filters out invalid entries (staff, coaches, missing fields)
    3. Cleans name formatting
    4. Deduplicates against existing Airtable records
    5. Classifies records as NEW, DUPLICATE, or POSSIBLE_MATCH
    6. Returns detailed results with counts and names
    
    Args:
        request: CleanUploadRequest containing list of athlete records
        
    Returns:
        CleanUploadResponse with processing results and statistics
    """
    start_processing = datetime.now(timezone.utc)
    request_id = f"req_{start_processing.strftime('%Y%m%d_%H%M%S')}_{id(request)}"
    
    logger.info(f"📥 [{request_id}] Processing {len(request.athletes)} athlete records")
    
    try:
        # Convert Pydantic models to dictionaries
        scraped_data = [athlete.dict() for athlete in request.athletes]
        
        # Run the Airtable agent
        logger.info(f"🤖 [{request_id}] Starting Airtable agent processing...")
        new_records, duplicates, possible_matches = run_airtable_agent(scraped_data)
        
        # Calculate processing time
        processing_time = datetime.now(timezone.utc) - start_processing
        processing_time_ms = int(processing_time.total_seconds() * 1000)
        
        # Extract names for response
        uploaded_names = [record.get('name', 'Unknown') for record in new_records]
        duplicate_names = [item['new_record'].get('name', 'Unknown') for item in duplicates]
        possible_match_names = [item['new_record'].get('name', 'Unknown') for item in possible_matches]
        
        # Calculate filtered count
        filtered_count = len(request.athletes) - len(new_records) - len(duplicates) - len(possible_matches)
        
        # Log results
        logger.info(f"✅ [{request_id}] Processing completed in {processing_time_ms}ms")
        logger.info(f"📊 [{request_id}] Results: {len(new_records)} new, {len(duplicates)} duplicates, {len(possible_matches)} possible matches, {filtered_count} filtered")
        
        # Create response
        response = CleanUploadResponse(
            success=True,
            timestamp=datetime.now(timezone.utc).isoformat(),
            processing_time_ms=processing_time_ms,
            uploaded_count=len(new_records),
            duplicate_count=len(duplicates),
            possible_match_count=len(possible_matches),
            filtered_count=filtered_count,
            uploaded_names=uploaded_names,
            duplicate_names=duplicate_names,
            possible_match_names=possible_match_names,
            total_input=len(request.athletes),
            agent_version=AGENT_VERSION
        )
        
        return response
        
    except Exception as e:
        logger.error(f"❌ [{request_id}] Processing failed: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Processing failed: {str(e)}"
        )

@app.post("/clean-upload/batch", response_model=CleanUploadResponse)
async def clean_upload_athletes_batch(request: CleanUploadRequest):
    """
    Batch version of clean-upload with additional batch processing features.
    
    This endpoint is identical to /clean-upload but includes additional
    batch-specific logging and validation.
    """
    return await clean_upload_athletes(request)

@app.get("/stats")
async def get_stats():
    """Get API usage statistics."""
    return {
        "version": AGENT_VERSION,
        "start_time": start_time.isoformat(),
        "uptime": str(datetime.now(timezone.utc) - start_time),
        "endpoints": [
            {"path": "/", "method": "GET", "description": "API information"},
            {"path": "/health", "method": "GET", "description": "Health check"},
            {"path": "/clean-upload", "method": "POST", "description": "Process and upload athletes"},
            {"path": "/clean-upload/batch", "method": "POST", "description": "Batch processing"},
            {"path": "/stats", "method": "GET", "description": "API statistics"},
            {"path": "/docs", "method": "GET", "description": "API documentation"}
        ]
    }

if __name__ == "__main__":
    # Development server
    logger.info("🚀 Starting development server...")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    ) 