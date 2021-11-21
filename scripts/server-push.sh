#!/bin/sh

cd /home/ubuntu
git add backups/$currentDate-start log
git stash push
git checkout -b $currentDate-start
git stash pop
echo "Start: $currentDate" >> log/startup-log.txt
git commit backups/$currentDate-start log -m $currentDate-start
git push origin $currentDate-start
git checkout main
rm -r backups/$currentDate-start
git restore --staged .