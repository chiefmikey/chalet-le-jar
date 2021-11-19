#!/bin/sh

cd /home/ubuntu
screen -S watch -X quit
screen -S bedrock -X stuff "say Refreshing in 10...9...8...\n"
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 1
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 1
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 8
screen -S bedrock -X stuff "stop\n"
sleep 10
killall screen
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
zip -r worlds/clj/data.zip worlds/clj/level.dat worlds/clj/level.dat_old worlds/clj/levelname.txt
git add log worlds
git restore --staged worlds/clj/level.dat worlds/clj/level.dat_old worlds/clj/levelname.txt worlds/clj/db/lost
git stash push
git checkout -b $currentDate-refresh
git stash pop
echo "Refresh: $currentDate" >> log/refresh-log.txt
git commit -am $currentDate-refresh
git push origin $currentDate-refresh
rm worlds/clj/data.zip
git fetch --all
git checkout main
git reset --hard origin/main
git checkout origin/$currentDate-refresh worlds log
unzip -o worlds/clj/data.zip
rm worlds/clj/data.zip
LD_LIBRARY_PATH=/home/ubuntu su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root
su -s /bin/bash -c 'screen -S watch -dm watch /home/ubuntu/scripts/server-autosave.sh' root
