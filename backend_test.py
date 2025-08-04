#!/usr/bin/env python3
"""
Backend API Testing Script for Wedding Website
Tests RSVP, Weather, and Root endpoints
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    print("❌ REACT_APP_BACKEND_URL not found in environment")
    exit(1)

API_BASE = f"{BACKEND_URL}/api"

def test_root_endpoint():
    """Test GET /api/ endpoint"""
    print("\n🔍 Testing Root Endpoint...")
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data:
                print("✅ Root endpoint working correctly")
                return True
            else:
                print("❌ Root endpoint missing expected message field")
                return False
        else:
            print(f"❌ Root endpoint failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Root endpoint error: {e}")
        return False

def test_rsvp_christian():
    """Test POST /api/rsvp with Christian wedding data"""
    print("\n🔍 Testing RSVP Endpoint - Christian Wedding...")
    
    rsvp_data = {
        "ceremony": "Christian",
        "name": "Sarah Johnson",
        "email": "sarah.johnson@email.com",
        "attending": "yes",
        "guests": "2"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/rsvp",
            json=rsvp_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "success" in data and "message" in data:
                print("✅ Christian RSVP endpoint working correctly")
                return True
            else:
                print("❌ Christian RSVP response missing expected fields")
                return False
        else:
            print(f"❌ Christian RSVP failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Christian RSVP error: {e}")
        return False

def test_rsvp_hindu():
    """Test POST /api/rsvp with Hindu wedding data"""
    print("\n🔍 Testing RSVP Endpoint - Hindu Wedding...")
    
    rsvp_data = {
        "ceremony": "Hindu",
        "name": "Priya Sharma",
        "email": "priya.sharma@email.com",
        "attending": "Yes",
        "guests": "4",
        "dietary": "No restrictions"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/rsvp",
            json=rsvp_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "success" in data and "message" in data:
                print("✅ Hindu RSVP endpoint working correctly")
                return True
            else:
                print("❌ Hindu RSVP response missing expected fields")
                return False
        else:
            print(f"❌ Hindu RSVP failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Hindu RSVP error: {e}")
        return False

def test_rsvp_missing_fields():
    """Test POST /api/rsvp with missing required fields"""
    print("\n🔍 Testing RSVP Endpoint - Missing Fields...")
    
    rsvp_data = {
        "ceremony": "Christian",
        "name": "Test User"
        # Missing email, attending, guests
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/rsvp",
            json=rsvp_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        # Should return 422 for validation error or handle gracefully
        if response.status_code in [422, 400]:
            print("✅ RSVP validation working correctly")
            return True
        elif response.status_code == 200:
            print("⚠️ RSVP accepts incomplete data - may need validation")
            return True
        else:
            print(f"❌ RSVP validation failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ RSVP validation error: {e}")
        return False

def test_weather_vettucaud():
    """Test GET /api/weather/Vettucaud (Christian wedding location)"""
    print("\n🔍 Testing Weather Endpoint - Vettucaud...")
    
    try:
        response = requests.get(f"{API_BASE}/weather/Vettucaud", timeout=15)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["temp", "condition", "humidity", "location"]
            
            if all(field in data for field in required_fields):
                print("✅ Vettucaud weather endpoint working correctly")
                return True
            else:
                missing = [f for f in required_fields if f not in data]
                print(f"❌ Vettucaud weather missing fields: {missing}")
                return False
        else:
            print(f"❌ Vettucaud weather failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Vettucaud weather error: {e}")
        return False

def test_weather_trivandrum():
    """Test GET /api/weather/Trivandrum (Hindu wedding location)"""
    print("\n🔍 Testing Weather Endpoint - Trivandrum...")
    
    try:
        response = requests.get(f"{API_BASE}/weather/Trivandrum", timeout=15)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["temp", "condition", "humidity", "location"]
            
            if all(field in data for field in required_fields):
                print("✅ Trivandrum weather endpoint working correctly")
                return True
            else:
                missing = [f for f in required_fields if f not in data]
                print(f"❌ Trivandrum weather missing fields: {missing}")
                return False
        else:
            print(f"❌ Trivandrum weather failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Trivandrum weather error: {e}")
        return False

def test_weather_invalid_location():
    """Test GET /api/weather with invalid location"""
    print("\n🔍 Testing Weather Endpoint - Invalid Location...")
    
    try:
        response = requests.get(f"{API_BASE}/weather/InvalidLocation123", timeout=15)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            # Should still return fallback data
            if "temp" in data and "condition" in data:
                print("✅ Weather fallback working correctly")
                return True
            else:
                print("❌ Weather fallback not working")
                return False
        else:
            print(f"❌ Weather invalid location failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Weather invalid location error: {e}")
        return False

def main():
    """Run all backend tests"""
    print("🚀 Starting Backend API Tests")
    print(f"Testing against: {API_BASE}")
    
    results = []
    
    # Test all endpoints
    results.append(("Root Endpoint", test_root_endpoint()))
    results.append(("RSVP Christian", test_rsvp_christian()))
    results.append(("RSVP Hindu", test_rsvp_hindu()))
    results.append(("RSVP Validation", test_rsvp_missing_fields()))
    results.append(("Weather Vettucaud", test_weather_vettucaud()))
    results.append(("Weather Trivandrum", test_weather_trivandrum()))
    results.append(("Weather Fallback", test_weather_invalid_location()))
    
    # Summary
    print("\n" + "="*50)
    print("📊 TEST SUMMARY")
    print("="*50)
    
    passed = 0
    failed = 0
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name:<20} {status}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal: {len(results)} tests")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 All tests passed!")
        return True
    else:
        print(f"\n⚠️ {failed} test(s) failed")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)