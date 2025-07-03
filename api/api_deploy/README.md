# GNG Agent API

Backend data processing service for NCAA athlete data.

## Purpose
- Process raw athlete data from scrapers
- Clean and deduplicate data
- Upload to Airtable database
- Feed clean data to GnGEngine frontend

## Endpoints
- `POST /clean-upload` - Process and upload athlete data
- `GET /health` - Health check
- `GET /stats` - API statistics

## Environment Variables
- `AIRTABLE_API_KEY` - Your Airtable API key
- `AIRTABLE_BASE_ID` - Your Airtable base ID
- `AIRTABLE_TABLE_NAME` - Table name (default: "Verified Athletes")
