#!/bin/sh

cd /home/ubuntu
git push origin "start/$currentDate"
git checkout main
rm -r backups/start/$currentDate
git restore --staged .