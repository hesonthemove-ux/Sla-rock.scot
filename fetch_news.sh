#!/bin/bash

# Genres to fetch
GENRES=("metal" "alt" "punk" "rock")

# Simple AI-style Dialect Rewriter Function
# [cite: 2026-01-29] Rewording RSS for local dialect
dialect_rewriter() {
    sed -i 's/\bThe\b/The/g; s/\bthe\b/the/g' $1
    sed -i 's/\bto\b/tae/g' $1
    sed -i 's/\bTo\b/Tae/g' $1
    sed -i 's/\bdo not\b/dinna/g' $1
    sed -i 's/\bdont\b/dinna/g' $1
    sed -i 's/\bwith\b/wi/g' $1
    sed -i 's/\bWith\b/Wi/g' $1
    sed -i 's/\bfrom\b/frae/g' $1
    sed -i 's/\bFrom\b/Frae/g' $1
    sed -i 's/\bgirl\b/lassie/g' $1
    sed -i 's/\bboy\b/laddie/g' $1
    sed -i 's/\bknow\b/ken/g' $1
    sed -i 's/\bam not\b/am no/g' $1
    sed -i 's/\bgood\b/braw/g' $1
    sed -i 's/\bno\b/nae/g' $1
    sed -i 's/\bNo\b/Nae/g' $1
}

# RSS Sourcing [cite: 2026-01-23] 
# Pulling Rock news but focused on Scotland Rock scene
for GENRE in "${GENRES[@]}"; do
    # Fetching news (using a public rock RSS as a placeholder)
    curl -s "https://www.ultimate-guitar.com/news/rss" | grep -oP '(?<=<title><!\[CDATA\[).*?(?=\]\]></title>)' | head -n 10 > /var/www/html/news/${GENRE}.txt
    
    # Apply the Scottish Dialect
    dialect_rewriter /var/www/html/news/${GENRE}.txt
done

echo "ROCK.SCOT WIRE UPDATED WI' LOCAL DIALECT!"
