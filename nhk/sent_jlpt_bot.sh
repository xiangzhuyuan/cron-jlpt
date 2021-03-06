#!/usr/bin/env bash

export PATH=/home/matt/.rbenv/shims:$PATH


export CONSUMER_KEY=""
export CONSUMER_SECRET=""
export ACCESS_TOKEN=""
export ACCESS_TOKEN_SECRET=""

DATE=`date +%Y-%m-%d`
LOG_FILE="$(dirname $0)/log/${DATE}.log"
echo "start cron job at ${DATE}" >> $LOG_FILE
(ruby "$(dirname $0)/test.rb" >> $LOG_FILE ) && (ruby "$(dirname $0)/prepare_png.rb" >> $LOG_FILE) && (ruby "$(dirname $0)/sent.rb" >> $LOG_FILE)
echo "end cron job at ${DATE}" >> $LOG_FILE
