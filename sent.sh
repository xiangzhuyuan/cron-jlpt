#!/usr/bin/env bash

export PATH=/home/matt/.rbenv/shims:$PATH

DATE=`date +%Y-%m-%d`
LOG_FILE="/home/matt/cron-jlpt/log/${DATE}.log"

if [ ! -d /home/matt/cron-jlpt/log/ ]; then
 mkdir -p /home/matt/cron-jlpt/log/
 touch /home/matt/cron-jlpt/log/cron.log
fi

echo "start cron job at ${DATE}" >> $LOG_FILE
ruby /home/matt/cron-jlpt/client.rb >> $LOG_FILE

echo "end cron job at ${DATE}" >> $LOG_FILE
