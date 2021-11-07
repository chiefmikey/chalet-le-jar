#!/bin/sh

cd /home/ubuntu
screen -S bedrock -X stuff "save hold\n"
sleep 5
currentDate=$(date +%y-%m-%d-%H-%M-%S)
git checkout main
git add worlds
git commit -am $currentDate
git pull --no-edit origin main
git push origin main
git checkout -b $currentDate
git push origin $currentDate
git checkout main
screen -S bedrock -X stuff "save resume\n"
