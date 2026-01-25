import httpx
import feedparser
import json
import time

# SUPABASE CONFIG
URL = "https://figcmwjdbeurhjopxknp.supabase.co/rest/v1/news_wire"
HEADERS = {
    "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2Ntd2pkYmV1cmhqb3B4a25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4ODI5MDYsImV4cCI6MjA4NDQ1ODkwNn0.iiE65zB0lAsEkJE6lotNU1lORpL94oxZ7-ebHhJ3FgY",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2Ntd2pkYmV1cmhqb3B4a25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4ODI5MDYsImV4cCI6MjA4NDQ1ODkwNn0.iiE65zB0lAsEkJE6lotNU1lORpL94oxZ7-ebHhJ3FgY",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates"
}

SOURCES = [
    {"name": "Kerrang!", "url": "https://www.kerrang.com/feed", "genre": "Heavy"},
    {"name": "The Skinny", "url": "https://www.theskinny.co.uk/rss/music", "genre": "Indie"},
    {"name": "The Scotsman", "url": "https://www.scotsman.com/arts-and-culture/music/rss", "genre": "Indie"}
]

def scrape_the_wire():
    print(f"--- SCRAPING THE WIRE [{time.strftime('%H:%M:%S')}] ---")
    for source in SOURCES:
        try:
            feed = feedparser.parse(source['url'])
            for entry in feed.entries[:5]: # Get top 5 headlines
                payload = {
                    "source_name": source['name'],
                    "headline": entry.title,
                    "source_url": entry.link,
                    "genre": source['genre'],
                    "raw_metadata": entry # The NoSQL JSONB Dump
                }
                
                # Push to Supabase via HTTPX
                with httpx.Client() as client:
                    r = client.post(URL, headers=HEADERS, json=payload)
                    print(f"Synced: {entry.title[:40]}... [{r.status_code}]")
        except Exception as e:
            print(f"Error scraping {source['name']}: {e}")

if __name__ == "__main__":
    scrape_the_wire()
