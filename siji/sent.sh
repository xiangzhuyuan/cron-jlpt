#!/usr/bin/env bash

export PATH=/home/matt/.rbenv/shims:$PATH

export CONSUMER_KEY=""
export CONSUMER_SECRET=""
export ACCESS_TOKEN=""
export ACCESS_TOKEN_SECRET=""

DATE=`date +%Y-%m-%d`
LOG_FILE="$(dirname $0)/log/${DATE}.log"

#if [ ! -d /home/matt/cron-jlpt/log/ ]; then
# mkdir -p /home/matt/cron-jlpt/log/
# touch /home/matt/cron-jlpt/log/cron.log
#fi
#
echo "start cron job at ${DATE}" >> $LOG_FILE
ruby "$(dirname $0)/sent.rb" >> $LOG_FILE
echo "end cron job at ${DATE}" >> $LOG_FILE
