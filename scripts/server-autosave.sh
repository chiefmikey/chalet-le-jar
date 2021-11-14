#!/bin/sh

cd /home/ubuntu
screen -S bedrock -X stuff "save hold\n"
sleep 10
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
zip -r worlds.zip worlds
git add worlds.zip log
git restore --staged worlds
git stash push
git checkout -b autosave-$currentDate
git stash pop
echo "Autosave: $currentDate" >> log/autosave-log.txt
git commit -am autosave-$currentDate
git push origin autosave-$currentDate
rm worlds.zip
screen -S bedrock -X stuff "save resume\n"
