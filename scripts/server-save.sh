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
git checkout -b save-$currentDate
git stash pop
echo "Save: $currentDate" >> log/save-log.txt
git commit -am save-$currentDate
git push origin save-$currentDate
rm worlds.zip
screen -S bedrock -X stuff "save resume\n"
su -s /bin/bash -c 'screen -S watch -dm watch -n 300 /home/ubuntu/scripts/server-autosave.sh' root