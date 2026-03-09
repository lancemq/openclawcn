#!/bin/bash

# Setup hourly cron job for OpenClaw content fetching
# This script sets up a cron job that runs every hour to fetch OpenClaw content

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$PROJECT_DIR/logs/content-fetch.log"

# Create logs directory if it doesn't exist
mkdir -p "$PROJECT_DIR/logs"

# Create the cron job entry
CRON_JOB="0 * * * * cd $PROJECT_DIR && npm run content:fetch >> $LOG_FILE 2>&1"

# Add to crontab
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

echo "✅ Hourly cron job set up successfully!"
echo "📝 Log file: $LOG_FILE"
echo "⏰ Cron job: $CRON_JOB"