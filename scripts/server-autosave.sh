#!/bin/bash

sleep 300
cd /home/chalet-le-jar
export currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
screen -S bedrock -X stuff "save hold\n"
sleep 10
cp -r worlds/clj backups/autosave/$currentDate
screen -S bedrock -X stuff "save resume\n"
git restore --staged .
git pull --no-edit origin log
echo + Autosave: $currentDate >> log/history.txt
echo + $currentDate >> log/autosave-log.txt
git commit -am "autosave/$currentDate"
git push origin main:log
cd /home/chalet-le-jar/backups/autosave
ls -1t | tail -n +73 | xargs -d "\n" rm -rf
