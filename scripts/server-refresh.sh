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
git checkout -b refresh-$currentDate
git stash pop
echo "Refresh: $currentDate" >> log/refresh-log.txt
git commit -am refresh-$currentDate
git push origin refresh-$currentDate
rm worlds.zip
screen -S bedrock -X stuff "save resume\n"
screen -S bedrock -X stuff "stop\n"
git fetch --all
git reset --hard origin/main
rm -R worlds log
git checkout origin/refresh-$currentDate worlds.zip log
unzip worlds.zip
rm worlds.zip
LD_LIBRARY_PATH=/home/ubuntu su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root
su -s /bin/bash -c 'screen -S watch -dm watch -n 150 /home/ubuntu/scripts/server-autosave.sh' root
