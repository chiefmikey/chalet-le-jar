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
echo "Current: $currentDate" >> /home/ubuntu/log/rewind-log.txt
echo "Backup: $branch" >> /home/ubuntu/log/rewind-log.txt
git commit -am $currentDate
git push origin $currentDate
screen -S bedrock -X stuff "save resume\n"
screen -S bedrock -X stuff "stop\n"
git fetch --all
git reset --hard origin/main
rm -R world
git checkout origin/$branch world
mv /home/ubuntu/world /home/ubuntu/worlds
LD_LIBRARY_PATH=/home/ubuntu su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root
