import requests
import datetime
import hashlib
import sys

def test_kontakt():
    url = "http://localhost:3001/index.php?path=kontakt"
    
    # Calculate checksum: md5(date('Y-m-d'))
    today = datetime.date.today().isoformat()
    cs = hashlib.md5(today.encode()).hexdigest()
    
    payload = {
        "cs": cs,
        "msg": "Test message from automated script",
        "abs": "test@example.com",
        "path": "kontakt"
    }
    
    print(f"Sending request to {url}")
    print(f"Payload: {payload}")
    
    try:
        response = requests.post(url, json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_kontakt()
