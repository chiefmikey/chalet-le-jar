#!/bin/sh

screen -S bedrock -X stuff 'save hold\n'
sleep 5
currentDate=$(date +%y-%m-%d-%H-%M-%S)
git checkout main
git add .
git pull --no-edit origin main -f
git commit -am $currentDate
git push origin main
git checkout -b $currentDate
git push origin $currentDate
git checkout main
screen -S bedrock -X stuff 'save resume\n'
screen -S bedrock -X stuff 'stop\n'
sudo apt update -y
sudo apt upgrade -y
git pull --no-edit origin main -f
LD_LIBRARY_PATH=. screen -S bedrock -dm sudo ~/bedrock_server
