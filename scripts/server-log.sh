#!/bin/bash -v

set -x
git restore --staged .
git pull --no-edit origin log
echo + $ACTION: $CURRENT_DATE >> log/history.txt
echo + $CURRENT_DATE >> log/$ACTION-log.txt
git commit -am "$ACTION/$CURRENT_DATE"
git push origin main:log
