#!/bin/bash -v

set -x
cd /home/chalet-le-jar
git push origin backup/$currentDate
git checkout main
rm -r backups/backup/$currentDate
git restore --staged .
git pull origin log
echo + Backup: $currentDate >> history/log.txt
echo + $currentDate >> log/backup-log.txt
git commit -am "backup/$currentDate"
git push origin main:log
