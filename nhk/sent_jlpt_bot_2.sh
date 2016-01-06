#!/usr/bin/env bash

export PATH=/home/matt/.rbenv/shims:$PATH

#export CONSUMER_KEY="A92HuuC2zgIBDbwWteMlQX3hK"
#export CONSUMER_SECRET="O6YLt1u3mIQOaBGw3LY91pQbpfdzpz5OdpnGyjzxkFhTmrIR26"
#export ACCESS_TOKEN="143062296-A9bdsRSqe9xb6iPcuTY6xZLFhTCfozQ5zIFc6rJZ"
#export ACCESS_TOKEN_SECRET="oFAJxfhXG73Bqi8icTa4glKkGd1SErLjcMgunNV0m7i4Y"


export CONSUMER_KEY="uBXzHR8yGhoQksYVcVJlQ8TRd"
export CONSUMER_SECRET="prjM7BZgvTjr7ezaSS18zbYgtQ1w2in73Emgy59Y1nmkdISL5U"
export ACCESS_TOKEN="4446821292-fgutqEu0rFjcpG1F5elAyxPFEdrhn4nDzN0IyGv"
export ACCESS_TOKEN_SECRET="uyXdYkgQTacdc9EAR29RfMtR4Db20tX8HvoYGQkW9z84u"

DATE=`date +%Y-%m-%d`
LOG_FILE="$(dirname $0)/log/${DATE}.log"
echo "start cron job at ${DATE}" >> $LOG_FILE
echo "Step2 start"
ruby "$(dirname $0)/prepare_png.rb" >> $LOG_FILE
echo "end cron job at ${DATE}" >> $LOG_FILE
echo "End step 2"
