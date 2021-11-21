#!/bin/sh

cd /home/ubuntu
git push origin $currentDate-start
git checkout main
rm -r backups/$currentDate-start
git restore --staged .