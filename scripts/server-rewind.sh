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
git checkout -b rewind-$currentDate
git stash pop
echo "Current: $currentDate" >> log/rewind-log.txt
echo "Backup: $branch" >> log/rewind-log.txt
git commit -am rewind-$currentDate
git push origin rewind-$currentDate
rm worlds.zip
screen -S bedrock -X stuff "save resume\n"
screen -S bedrock -X stuff "stop\n"
git fetch --all
git reset --hard origin/main
git checkout origin/$branch worlds.zip
rm -R worlds
unzip worlds.zip
rm worlds.zip
LD_LIBRARY_PATH=/home/ubuntu su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root
su -s /bin/bash -c 'screen -S watch -dm watch -n 150 /home/ubuntu/scripts/server-autosave.sh' root
