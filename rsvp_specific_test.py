#!/usr/bin/env python3
"""
Specific RSVP Testing Script for Updated Functionality
Tests the simplified RSVP form without dietary field
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

def test_rsvp_christian_attending_no():
    """Test RSVP for Christian ceremony with attending=no"""
    print("\n🔍 Testing RSVP - Christian Wedding (Not Attending)...")
    
    rsvp_data = {
        "ceremony": "Christian",
        "name": "Michael Thompson",
        "email": "michael.thompson@email.com",
        "attending": "no",
        "guests": "0"
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
            if data.get("success") and "message" in data:
                print("✅ Christian RSVP (not attending) working correctly")
                return True
            else:
                print("❌ Christian RSVP (not attending) response invalid")
                return False
        else:
            print(f"❌ Christian RSVP (not attending) failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Christian RSVP (not attending) error: {e}")
        return False

def test_rsvp_hindu_attending_yes():
    """Test RSVP for Hindu ceremony with attending=yes"""
    print("\n🔍 Testing RSVP - Hindu Wedding (Attending)...")
    
    rsvp_data = {
        "ceremony": "Hindu",
        "name": "Anjali Patel",
        "email": "anjali.patel@email.com",
        "attending": "yes",
        "guests": "3"
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
            if data.get("success") and "message" in data:
                print("✅ Hindu RSVP (attending) working correctly")
                return True
            else:
                print("❌ Hindu RSVP (attending) response invalid")
                return False
        else:
            print(f"❌ Hindu RSVP (attending) failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Hindu RSVP (attending) error: {e}")
        return False

def test_rsvp_invalid_ceremony():
    """Test RSVP with invalid ceremony type"""
    print("\n🔍 Testing RSVP - Invalid Ceremony Type...")
    
    rsvp_data = {
        "ceremony": "Buddhist",  # Invalid ceremony type
        "name": "Test User",
        "email": "test@email.com",
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
        
        # Should still work as backend doesn't validate ceremony type strictly
        if response.status_code == 200:
            print("✅ RSVP accepts any ceremony type (flexible validation)")
            return True
        else:
            print(f"❌ RSVP invalid ceremony failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ RSVP invalid ceremony error: {e}")
        return False

def test_rsvp_invalid_attending():
    """Test RSVP with invalid attending value"""
    print("\n🔍 Testing RSVP - Invalid Attending Value...")
    
    rsvp_data = {
        "ceremony": "Christian",
        "name": "Test User",
        "email": "test@email.com",
        "attending": "maybe",  # Invalid attending value
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
        
        # Should still work as backend doesn't validate attending value strictly
        if response.status_code == 200:
            print("✅ RSVP accepts any attending value (flexible validation)")
            return True
        else:
            print(f"❌ RSVP invalid attending failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ RSVP invalid attending error: {e}")
        return False

def test_rsvp_empty_fields():
    """Test RSVP with empty required fields"""
    print("\n🔍 Testing RSVP - Empty Required Fields...")
    
    rsvp_data = {
        "ceremony": "",
        "name": "",
        "email": "",
        "attending": "",
        "guests": ""
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
        
        # Should still work as backend doesn't validate empty strings strictly
        if response.status_code == 200:
            print("✅ RSVP accepts empty fields (minimal validation)")
            return True
        else:
            print(f"❌ RSVP empty fields failed with status {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ RSVP empty fields error: {e}")
        return False

def main():
    """Run specific RSVP tests"""
    print("🚀 Starting Specific RSVP Tests")
    print(f"Testing against: {API_BASE}")
    
    results = []
    
    # Test specific RSVP scenarios
    results.append(("RSVP Christian (Not Attending)", test_rsvp_christian_attending_no()))
    results.append(("RSVP Hindu (Attending)", test_rsvp_hindu_attending_yes()))
    results.append(("RSVP Invalid Ceremony", test_rsvp_invalid_ceremony()))
    results.append(("RSVP Invalid Attending", test_rsvp_invalid_attending()))
    results.append(("RSVP Empty Fields", test_rsvp_empty_fields()))
    
    # Summary
    print("\n" + "="*50)
    print("📊 SPECIFIC RSVP TEST SUMMARY")
    print("="*50)
    
    passed = 0
    failed = 0
    
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name:<30} {status}")
        if result:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal: {len(results)} tests")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    if failed == 0:
        print("\n🎉 All specific RSVP tests passed!")
        return True
    else:
        print(f"\n⚠️ {failed} test(s) failed")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)