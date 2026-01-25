import httpx
import time

url = "https://figcmwjdbeurhjopxknp.supabase.co/rest/v1/news_wire?select=id&limit=1"
headers = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2Ntd2pkYmV1cmhqb3B4a25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4ODI5MDYsImV4cCI6MjA4NDQ1ODkwNn0.iiE65zB0lAsEkJE6lotNU1lORpL94oxZ7-ebHhJ3FgY",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2Ntd2pkYmV1cmhqb3B4a25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4ODI5MDYsImV4cCI6MjA4NDQ1ODkwNn0.iiE65zB0lAsEkJE6lotNU1lORpL94oxZ7-ebHhJ3FgY"
}

print("--- ROCK.SCOT HEARTBEAT (LEAN MODE) ACTIVE ---")
while True:
    try:
        with httpx.Client() as client:
            response = client.get(url, headers=headers)
            if response.status_code == 200:
                print(f"[{time.strftime('%H:%M:%S')}] Connection Solid. Ticker Warm.")
            else:
                print(f"[{time.strftime('%H:%M:%S')}] Supabase responded with: {response.status_code}")
    except Exception as e:
        print(f"[{time.strftime('%H:%M:%S')}] Connection Drop: {e}")
    
    time.sleep(300) 
