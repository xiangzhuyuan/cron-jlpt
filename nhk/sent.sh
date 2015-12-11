#!/usr/bin/env bash

export PATH=/home/matt/.rbenv/shims:$PATH

DATE=`date +%Y-%m-%d`
LOG_FILE="/home/matt/20151211/nhk/${DATE}.log"

echo "start cron job at ${DATE}" >> $LOG_FILE

# sent
ruby /home/matt/20151211/nhk/test.rb >> $LOG_FILE

# prepare png
ruby /home/matt/20151211/nhk/prepare_png.rb >> $LOG_FILE

ruby /home/matt/20151211/nhk/sent.rb >> $LOG_FILE

echo "end cron job at ${DATE}" >> $LOG_FILE
