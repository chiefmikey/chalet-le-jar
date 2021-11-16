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
git checkout -b $currentDate-rewind
git stash pop
echo "Current: $currentDate" >> log/rewind-log.txt
echo "Backup: $branch" >> log/rewind-log.txt
git commit -am $currentDate-rewind
git push origin $currentDate-rewind
screen -S bedrock -X stuff "save resume\n"
screen -S bedrock -X stuff "stop\n"
rm worlds/clj/data.zip
git fetch --all
git reset --hard origin/main
git checkout origin/$branch worlds
rm worlds/clj/level.dat worlds/clj/level.dat_old worlds/clj/levelname.txt
unzip worlds/clj/data.zip
rm worlds/clj/data.zip
LD_LIBRARY_PATH=/home/ubuntu su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root
su -s /bin/bash -c 'screen -S watch -dm watch /home/ubuntu/scripts/server-autosave.sh' root
