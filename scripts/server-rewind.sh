#!/bin/sh

cd /home/ubuntu
screen -S bedrock -X stuff "save hold\n"
sleep 10
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
zip -r worlds.zip /home/ubuntu/worlds
git add /home/ubuntu/worlds.zip /home/ubuntu/log
git restore --staged /home/ubuntu/worlds
git stash push
git checkout -b $currentDate
git stash pop
echo "Current: $currentDate" >> /home/ubuntu/log/rewind-log.txt
echo "Backup: $branch" >> /home/ubuntu/log/rewind-log.txt
git commit -am $currentDate
git push origin $currentDate
rm /home/ubuntu/worlds.zip
screen -S bedrock -X stuff "save resume\n"
screen -S bedrock -X stuff "stop\n"
git fetch --all
git reset --hard origin/main
git checkout origin/$branch worlds.zip
rm -R /home/ubuntu/worlds
unzip worlds.zip
rm /home/ubuntu/worlds.zip
LD_LIBRARY_PATH=/home/ubuntu su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root
