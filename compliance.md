- [2026-01-29] Added set_dialect.sh and fetch_news.sh to compliance tracking.
- [2026-01-29] fetch_news.sh active: Scrapes 8 sources, splits into 5 Master Genres.
[2026-01-29] Build v307.00: 
- Moved assets to /assets/
- Moved news to /data/
- Renamed 1000009922.png to bg_collage.png
- Corrected CSS word-wrap and pathing logic.

## News Pipeline Logic (Jan 2026)
- **Script:** `fetch_news.sh` handles RSS aggregation from 8 sources.
- **Script:** `set_dialect.sh` applies local Scottish rock dialect to headlines.
- **Frequency:** Update scheduled every 4 hours via Cron.
- **Rules:** 5 Master Genres, Scotland-only focus, redistributor credit applied.
