import feedparser
import requests
import json
from datetime import datetime

# --- CONFIG ---
URL = "https://figcmwjdbeurhjopxknp.supabase.co/rest/v1/news_wire"
GIG_URL = "https://figcmwjdbeurhjopxknp.supabase.co/rest/v1/gigs"

HEADERS = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2Ntd2pkYmV1cmhqb3B4a25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4ODI5MDYsImV4cCI6MjA4NDQ1ODkwNn0.iiE65zB0lAsEkJE6lotNU1lORpL94oxZ7-ebHhJ3FgY",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2Ntd2pkYmV1cmhqb3B4a25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4ODI5MDYsImV4cCI6MjA4NDQ1ODkwNn0.iiE65zB0lAsEkJE6lotNU1lORpL94oxZ7-ebHhJ3FgY",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

FEEDS = [
    {"name": "SKINNY MUSIC", "url": "https://www.theskinny.co.uk/music/rss"},
    {"name": "NME ROCK", "url": "https://www.nme.com/news/music/rss"},
    {"name": "GLASGOW ROCK", "url": "https://www.glasgowlive.co.uk/whats-on/music-nightlife/?service=rss"}
]

def update_wire():
    print("--- UPDATING WIRE (STRICT MODE) ---")
    for f in FEEDS:
        print(f"Checking {f['name']}...")
        feed = feedparser.parse(f['url'])
        for entry in feed.entries[:10]:
            content = (entry.title + entry.get('summary', '')).lower()
            # Explicit Rock/Scotland filter
            rock_keywords = ['rock', 'band', 'gig', 'album', 'tour', 'scotland', 'glasgow', 'edinburgh', 'festival', 'punk', 'metal', 'indie', 'live']
            
            if any(key in content for key in rock_keywords):
                summary = entry.get('summary', entry.get('description', 'Tap for details.'))
                # Remove HTML and slice to safe length
                clean_summary = summary.split('<')[0].strip()[:400] 

                payload = {
                    "source_name": f['name'],
                    "headline": str(entry.title),
                    "summary": str(clean_summary),
                    "source_url": str(entry.link)
                }
                
                res = requests.post(URL, headers=HEADERS, data=json.dumps(payload))
                
                if res.status_code >= 400:
                    print(f"  [Error {res.status_code}] {entry.title[:30]}")
                    # Log the reason if available
                    print(f"  Reason: {res.text}")
                else:
                    print(f"  [OK] {entry.title[:30]}")

def update_gigs():
    print("--- UPDATING GIGS ---")
    # Using simple list to avoid ID conflicts
    gigs = [
        {"date": "30 JAN", "venue": "Barrowlands", "act": "Mogwai"},
        {"date": "05 FEB", "venue": "King Tuts", "act": "The Snuts"},
        {"date": "12 FEB", "venue": "O2 Academy", "act": "Primal Scream"}
    ]
    for g in gigs:
        requests.post(GIG_URL, headers=HEADERS, data=json.dumps(g))
    print("Gigs synced.")

if __name__ == "__main__":
    update_wire()
    update_gigs()
