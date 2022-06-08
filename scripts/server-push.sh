#!/bin/bash -v

cd /home/chalet-le-jar
git push origin "backup/$currentDate"
git checkout main
rm -r backups/backup/$currentDate
git restore --staged .
