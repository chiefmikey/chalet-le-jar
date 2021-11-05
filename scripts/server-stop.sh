#!/bin/sh

screen -S bedrock -X stuff "save hold\n"
sleep 5
currentDate=$(date +%y-%m-%d-%H-%M-%S)
git checkout main
git add .
git commit -am $currentDate
git push origin main
git checkout -b $currentDate
git push origin $currentDate
git checkout main
screen -S bedrock -X stuff "save resume\n"
screen -S bedrock -X stuff "stop\n"
