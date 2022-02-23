#!/bin/bash

cd /home/ubuntu
git push origin "backup/$currentDate"
git checkout main
rm -r backups/backup/$currentDate
git restore --staged .
