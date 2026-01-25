import feedparser
import requests
import json

# --- CONFIG ---
URL = "https://figcmwjdbeurhjopxknp.supabase.co/rest/v1/news_wire"
GIG_URL = "https://figcmwjdbeurhjopxknp.supabase.co/rest/v1/gigs"

HEADERS = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2Ntd2pkYmV1cmhqb3B4a25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4ODI5MDYsImV4cCI6MjA4NDQ1ODkwNn0.iiE65zB0lAsEkJE6lotNU1lORpL94oxZ7-ebHhJ3FgY",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2Ntd2pkYmV1cmhqb3B4a25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4ODI5MDYsImV4cCI6MjA4NDQ1ODkwNn0.iiE65zB0lAsEkJE6lotNU1lORpL94oxZ7-ebHhJ3FgY",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

# ROCK ONLY - SCOTLAND FOCUSED
FEEDS = [
    {"name": "SKINNY MUSIC", "url": "https://www.theskinny.co.uk/music/rss"},
    {"name": "SNUTS/ROCK NEWS", "url": "https://www.nme.com/news/music/rss"},
    {"name": "GLASGOW ROCK", "url": "https://www.glasgowlive.co.uk/whats-on/music-nightlife/?service=rss"}
]

def update_wire():
    print("--- UPDATING SCOTTISH ROCK WIRE ---")
    for f in FEEDS:
        print(f"Filtering {f['name']}...")
        feed = feedparser.parse(f['url'])
        for entry in feed.entries[:8]:
            # Keyword filter to ensure it's Rock/Alt/Scotland
            content = (entry.title + entry.get('summary', '')).lower()
            rock_keywords = ['rock', 'band', 'gig', 'album', 'tour', 'scotland', 'glasgow', 'edinburgh', 'festival', 'punk', 'metal', 'indie']
            
            if any(key in content for key in rock_keywords):
                summary = entry.get('summary', entry.get('description', 'No details available.'))
                clean_summary = summary.split('<')[0].strip()[:500] 

                payload = {
                    "source_name": f['name'],
                    "headline": entry.title,
                    "summary": clean_summary,
                    "source_url": entry.link
                }
                
                res = requests.post(URL, headers=HEADERS, data=json.dumps(payload))
                print(f"  [{res.status_code}] {entry.title[:40]}")

def update_gigs():
    print("--- UPDATING GIGS ---")
    gigs = [
        {"date": "2026-01-30", "venue": "Barrowlands", "act": "Mogwai"},
        {"date": "2026-02-05", "venue": "King Tuts", "act": "The Snuts"},
        {"date": "2026-02-12", "venue": "O2 Academy", "act": "Primal Scream"}
    ]
    for g in gigs:
        requests.post(GIG_URL, headers=HEADERS, data=json.dumps(g))
    print("Gigs synced.")

if __name__ == "__main__":
    update_wire()
    update_gigs()
