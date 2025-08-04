#!/usr/bin/env python3
"""
Error Handling Test for RSVP API
Tests how the API handles various error conditions
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL')
API_BASE = f"{BACKEND_URL}/api"

def test_rsvp_with_very_long_data():
    """Test RSVP with extremely long field values"""
    print("\n🔍 Testing RSVP - Very Long Data...")
    
    long_string = "A" * 1000  # 1000 character string
    
    rsvp_data = {
        "ceremony": "Christian",
        "name": long_string,
        "email": f"{long_string}@email.com",
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
                print("✅ RSVP handles long data correctly")
                return True
            else:
                print("❌ RSVP long data response invalid")
                return False
        else:
            print(f"❌ RSVP long data failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ RSVP long data error: {e}")
        return False

def test_rsvp_with_special_characters():
    """Test RSVP with special characters"""
    print("\n🔍 Testing RSVP - Special Characters...")
    
    rsvp_data = {
        "ceremony": "Hindu",
        "name": "José María Ñoño",
        "email": "jose.maria@email.com",
        "attending": "yes",
        "guests": "1"
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
                print("✅ RSVP handles special characters correctly")
                return True
            else:
                print("❌ RSVP special characters response invalid")
                return False
        else:
            print(f"❌ RSVP special characters failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ RSVP special characters error: {e}")
        return False

def test_rsvp_with_invalid_json():
    """Test RSVP with malformed JSON"""
    print("\n🔍 Testing RSVP - Invalid JSON...")
    
    try:
        response = requests.post(
            f"{API_BASE}/rsvp",
            data="invalid json data",
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        # Should return 422 for invalid JSON
        if response.status_code == 422:
            print("✅ RSVP handles invalid JSON correctly")
            return True
        else:
            print(f"❌ RSVP invalid JSON failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ RSVP invalid JSON error: {e}")
        return False

def main():
    """Run error handling tests"""
    print("🚀 Starting Error Handling Tests")
    print(f"Testing against: {API_BASE}")
    
    results = []
    
    # Test error handling scenarios
    results.append(("RSVP Long Data", test_rsvp_with_very_long_data()))
    results.append(("RSVP Special Characters", test_rsvp_with_special_characters()))
    results.append(("RSVP Invalid JSON", test_rsvp_with_invalid_json()))
    
    # Summary
    print("\n" + "="*50)
    print("📊 ERROR HANDLING TEST SUMMARY")
    print("="*50)
    
    passed = 0
    failed = 0
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name:<25} {status}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal: {len(results)} tests")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 All error handling tests passed!")
        return True
    else:
        print(f"\n⚠️ {failed} test(s) failed")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)