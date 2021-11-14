#!/bin/sh

cd /home/ubuntu
screen -S watch -X quit
screen -S bedrock -X stuff "save hold\n"
sleep 10
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
zip -r worlds.zip worlds
git add worlds.zip log
git restore --staged worlds
git stash push
git checkout -b shutdown-$currentDate
git stash pop
echo "Shutdown: $currentDate" >> log/shutdown-log.txt
git commit -am shutdown-$currentDate
git push origin shutdown-$currentDate
rm worlds.zip
screen -S bedrock -X stuff "save resume\n"
screen -S bedrock -X stuff "stop\n"
