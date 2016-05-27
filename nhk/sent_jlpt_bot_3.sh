#!/usr/bin/env bash

export PATH=/home/matt/.rbenv/shims:$PATH

export CONSUMER_KEY=""
export CONSUMER_SECRET=""
export ACCESS_TOKEN=""
export ACCESS_TOKEN_SECRET=""

#DATE=`date +%Y-%m-%d`
#LOG_FILE="$(dirname $0)/log/${DATE}.log"
echo "Step 3 start"
ruby "$(dirname $0)/sent.rb" 
echo "Step3 end"
echo "end cron job at ${DATE}" 
