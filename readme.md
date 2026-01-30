# ROCK.SCOT | The Scottish Rock Wire
**Version:** 314.50 (Dadaist Cut-Out Build)
**Tagline:** Rockin' Scotland

## 🛠 System Architecture
The site operates as a **SLA-compliant Single Page Application (SPA)** hosted on a Raspberry Pi. It uses a custom-built automated pipeline to fetch and re-author news.

### 📡 The News Pipeline
1. **Source:** Aggregates from 12 independent UK/Scottish Rock & Alternative RSS feeds.
2. **Fetch (`fetch_news.sh`):** A Python-based scraper (using `feedparser`) pulls titles, content, and links.
3. **AI Re-Authoring (`set_dialect.sh`):** Headlines and stories are processed through a dialect engine to convert standard English into Scottish local dialect (e.g., "London" -> "The South").
4. **Display:** The front-end renders these as "Dadaist Cut-Outs" (ransom-note style).

### ⚙️ Automation & Compliance
- **Cron Job:** Runs every 4 hours (`0 */4 * * *`) to refresh the wire.
- **Backups:** A separate backup is created every day at 00:00.
- **Dialect Rules:** Locked into the logic to ensure "Rockin' Scotland" branding is consistent.
- **Compliance:** Full credit is given to original sources via the "Read Full Noise" pop-out feature.

## 💰 Commercial Policy (Jan 2026)
- **Regional Airtime:** £299
- **Multi-Regional Airtime:** £449
- **Creative Production:** £195
*(Not VAT Registered)*
