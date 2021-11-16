#!/bin/sh

cd /home/ubuntu
screen -S watch -X quit
screen -S bedrock -X stuff "save hold\n"
sleep 10
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
zip -r worlds/clj/data.zip worlds/clj/level.dat worlds/clj/level.dat_old worlds/clj/levelname.txt
git add log worlds
git restore --staged worlds/clj/level.dat worlds/clj/level.dat_old worlds/clj/levelname.txt
git stash push
git checkout -b $currentDate-refresh
git stash pop
echo "Refresh: $currentDate" >> log/refresh-log.txt
git commit -am $currentDate-refresh
git push origin $currentDate-refresh
screen -S bedrock -X stuff "save resume\n"
screen -S bedrock -X stuff "stop\n"
rm worlds/clj/data.zip
git fetch --all
git reset --hard origin/main
rm -r worlds log
git checkout origin/$currentDate-refresh worlds log
unzip worlds/clj/data.zip
rm worlds/clj/data.zip
LD_LIBRARY_PATH=/home/ubuntu su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root
su -s /bin/bash -c 'screen -S watch -dm watch /home/ubuntu/scripts/server-autosave.sh' root
