#!/bin/bash -v

set -x
git restore --staged .
git pull --no-edit origin log
cat log/history.txt >> log/temp-history.txt
cat log/$ACTION-log.txt >> log/temp-$ACTION-log.txt
echo + $ACTION: $CURRENT_DATE > log/history.txt
echo + $CURRENT_DATE > log/$ACTION-log.txt
cat log/temp-history.txt >> log/history.txt
cat log/temp-$ACTION-log.txt >> log/$ACTION-log.txt
rm log/temp-history.txt log/temp-$ACTION-log.txt
git commit -am "$ACTION/$CURRENT_DATE"
git push origin main:log
