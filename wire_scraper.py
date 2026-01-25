import requests
import feedparser

URL_BASE = "https://figcmwjdbeurhjopxknp.supabase.co/rest/v1"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2Ntd2pkYmV1cmhqb3B4a25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4ODI5MDYsImV4cCI6MjA4NDQ1ODkwNn0.iiE65zB0lAsEkJE6lotNU1lORpL94oxZ7-ebHhJ3FgY"

headers = {
    "apikey": KEY,
    "Authorization": f"Bearer {KEY}",
    "Content-Type": "application/json",
    "Prefer": "resolution=merge-duplicates"
}

def sync_hub():
    print("🎸 EXTRACTING LIVE ROCK INTEL...")
    
    # 1. Fetch sources from DB
    res = requests.get(f"{URL_BASE}/news_sources?is_active=eq.true", headers=headers)
    sources = res.json()
    
    for src in sources:
        # 2. READ THE ACTUAL RSS FEED
        feed = feedparser.parse(src['rss_url'])
        if not feed.entries:
            print(f"⚠️ {src['source_name']}: No stories found.")
            continue
            
        # Get the latest headline
        latest = feed.entries[0]
        
        # 3. PUSH REAL DATA
        payload = {
            "source_name": src['source_name'],
            "headline": latest.title.upper(), # High-impact uppercase
            "source_url": latest.link,
            "genre": src['master_genre'],
            "raw_metadata": {
                "summary": latest.get('summary', ''),
                "published": latest.get('published', '')
            }
        }

        push = requests.post(f"{URL_BASE}/news_wire", headers=headers, json=payload)
        
        if push.status_code in [200, 201, 204]:
            print(f"✅ {src['source_name']}: {latest.title[:30]}...")
        else:
            # If 409, it just means the headline hasn't changed yet
            print(f"💤 {src['source_name']}: No New Updates")

if __name__ == "__main__":
    sync_hub()
