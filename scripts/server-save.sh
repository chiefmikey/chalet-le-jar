#!/bin/sh

cd /home/ubuntu
screen -S bedrock -X stuff "save hold\n"
sleep 10
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
git add worlds log
git stash push
git checkout -b $currentDate
git stash pop
echo "Save: $currentDate" >> /home/ubuntu/log/save-log.txt
git commit -am $currentDate
git push origin $currentDate
screen -S bedrock -X stuff "save resume\n"
