#!/usr/bin/env bash

export PATH=/home/matt/.rbenv/shims:$PATH

export CONSUMER_KEY="A92HuuC2zgIBDbwWteMlQX3hK"
export CONSUMER_SECRET="O6YLt1u3mIQOaBGw3LY91pQbpfdzpz5OdpnGyjzxkFhTmrIR26"
export ACCESS_TOKEN="143062296-A9bdsRSqe9xb6iPcuTY6xZLFhTCfozQ5zIFc6rJZ"
export ACCESS_TOKEN_SECRET="oFAJxfhXG73Bqi8icTa4glKkGd1SErLjcMgunNV0m7i4Y"



DATE=`date +%Y-%m-%d`
LOG_FILE="/home/matt/20151211/nhk/${DATE}.log"
echo "start cron job at ${DATE}" >> $LOG_FILE
ruby /home/matt/20151211/nhk/test.rb >> $LOG_FILE
ruby /home/matt/20151211/nhk/prepare_png.rb >> $LOG_FILE
ruby /home/matt/20151211/nhk/sent.rb >> $LOG_FILE
echo "end cron job at ${DATE}" >> $LOG_FILE
