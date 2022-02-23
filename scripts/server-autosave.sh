#!/bin/bash

sleep 360
cd /home/ubuntu
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
screen -S bedrock -X stuff "save hold\n"
sleep 10
cp -r worlds/clj backups/autosave/$currentDate
screen -S bedrock -X stuff "save resume\n"
git restore --staged .
git checkout -b "autosave/$currentDate"
git commit -am "autosave/$currentDate"
git push origin "autosave/$currentDate"
cd /home/ubuntu/backups/autosave
ls -1t | tail -n +6 | xargs -d "\n" rm -rf
