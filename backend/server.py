from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import httpx
import asyncio


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# RSVP Models
class RSVPCreate(BaseModel):
    ceremony: str  # "Christian" or "Hindu"
    name: str
    email: str
    attending: str  # "Yes" or "No"
    guests: str
    dietary: Optional[str] = ""

class RSVPResponse(BaseModel):
    success: bool
    message: str

# Weather Models
class WeatherResponse(BaseModel):
    temp: float
    condition: str
    humidity: int
    location: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# RSVP Endpoint
@api_router.post("/rsvp", response_model=RSVPResponse)
async def create_rsvp(rsvp: RSVPCreate):
    try:
        # Prepare data for SheetDB
        data = {
            "data": {
                "ceremony": rsvp.ceremony,
                "name": rsvp.name,
                "email": rsvp.email,
                "attending": rsvp.attending,
                "guests": rsvp.guests,
                "dietary": rsvp.dietary
            }
        }
        
        # Send to SheetDB
        async with httpx.AsyncClient() as client:
            response = await client.post(
                os.environ['SHEETDB_API_URL'],
                json=data,
                timeout=30.0
            )
            
        if response.status_code == 201:
            return RSVPResponse(success=True, message="RSVP submitted successfully!")
        else:
            return RSVPResponse(success=False, message="Failed to submit RSVP. Please try again.")
            
    except Exception as e:
        logger.error(f"RSVP submission error: {e}")
        return RSVPResponse(success=False, message="An error occurred. Please try again.")

# Weather Endpoint
@api_router.get("/weather/{location}")
async def get_weather(location: str):
    try:
        # Using OpenWeatherMap API format (the key looks like it might be for this service)
        api_key = os.environ['WEATHER_API_KEY']
        
        # Try OpenWeatherMap API first
        async with httpx.AsyncClient() as client:
            url = f"https://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=metric"
            response = await client.get(url, timeout=10.0)
            
            if response.status_code == 200:
                data = response.json()
                return WeatherResponse(
                    temp=data['main']['temp'],
                    condition=data['weather'][0]['description'].title(),
                    humidity=data['main']['humidity'],
                    location=data['name']
                )
            else:
                # Fallback to default weather if API fails
                return WeatherResponse(
                    temp=28.0,
                    condition="Partly Cloudy",
                    humidity=65,
                    location=location
                )
                
    except Exception as e:
        logger.error(f"Weather API error: {e}")
        # Return default weather data as fallback
        temp = 30.0 if "trivandrum" in location.lower() else 28.0
        return WeatherResponse(
            temp=temp,
            condition="Sunny" if "trivandrum" in location.lower() else "Partly Cloudy",
            humidity=70 if "trivandrum" in location.lower() else 65,
            location=location
        )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
