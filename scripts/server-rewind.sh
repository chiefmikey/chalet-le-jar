#!/bin/sh

cd /home/ubuntu
screen -S bedrock -X stuff "save hold\n"
sleep 5
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
git checkout main
git add worlds
git commit -am $currentDate
git checkout -b $currentDate
git push origin $currentDate
git checkout main
screen -S bedrock -X stuff "save resume\n"
screen -S bedrock -X stuff "stop\n"
git fetch --all
git checkout origin/$branch worlds
git commit -am $branch
git checkout main
git pull --no-edit origin main
git push origin main
LD_LIBRARY_PATH=/home/ubuntu sudo su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root
