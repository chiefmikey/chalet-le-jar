#!/bin/sh

cd /home/ubuntu
screen -S bedrock -X stuff "save hold\n"
sleep 10
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
zip -r /home/ubuntu/worlds.zip /home/ubuntu/worlds
git add /home/ubuntu/worlds.zip /home/ubuntu/log
git restore --staged /home/ubuntu/worlds
git stash push
git checkout -b $currentDate
git stash pop
echo "Shutdown: $currentDate" >> /home/ubuntu/log/shutdown-log.txt
git commit -am $currentDate
git push origin $currentDate
rm /home/ubuntu/worlds.zip
screen -S bedrock -X stuff "save resume\n"
screen -S bedrock -X stuff "stop\n"
