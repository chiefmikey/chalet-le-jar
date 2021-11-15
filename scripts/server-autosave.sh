#!/bin/sh

sleep 300
cd /home/ubuntu
screen -S bedrock -X stuff "save hold\n"
sleep 10
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
zip -r worlds.zip worlds
git add worlds.zip log
git restore --staged worlds
git stash push
git checkout -b $currentDate-autosave
git stash pop
echo "Autosave: $currentDate" >> log/autosave-log.txt
git commit -am $currentDate-autosave
git push origin $currentDate-autosave
rm worlds.zip
screen -S bedrock -X stuff "save resume\n"
