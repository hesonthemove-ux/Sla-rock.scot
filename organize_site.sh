#!/bin/bash
# Rock.Scot Site Organizer - v311.10
# Purpose: Protect assets and purge unrequired build files.

ASSETS_DIR="/var/www/html/assets"
DATA_DIR="/var/www/html/data"

# 1. Ensure directories exist
mkdir -p $ASSETS_DIR
mkdir -p $DATA_DIR

# 2. Permissions Lock
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html
find /var/www/html -type f -exec chmod 644 {} \;

# 3. Purge Protection Logic
# We keep .zip, .png, .jpg and specific .txt data files.
# Everything else not in the approved list is removed to keep the build clean.
find /var/www/html -type f ! -name "*.php" ! -name "*.html" ! -name "*.sh" ! -name "*.md" ! -name "*.png" ! -name "*.jpg" ! -name "*.zip" ! -name "*.txt" -delete

echo "Site organized. Permissions locked. Texture pack secured."
