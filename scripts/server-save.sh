#!/bin/sh

cd /home/ubuntu
screen -S bedrock -X stuff "save hold\n"
sleep 10
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
mv /home/ubuntu/worlds /home/ubuntu/world
git add world log
git stash push
git checkout -b $currentDate
git stash pop
echo "Save: $currentDate" >> /home/ubuntu/log/save-log.txt
git commit -am $currentDate
git push origin $currentDate
mv /home/ubuntu/world /home/ubuntu/worlds
screen -S bedrock -X stuff "save resume\n"
