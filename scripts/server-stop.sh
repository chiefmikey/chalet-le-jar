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
git pull --no-edit origin main
echo $currentDate >> /home/ubuntu/log/shutdown-log.txt
git commit -am "Server stopped"
git push origin main
screen -S bedrock -X stuff "save resume\n"
screen -S bedrock -X stuff "stop\n"
