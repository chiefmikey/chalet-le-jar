#!/bin/sh

cd /home/ubuntu
screen -S watch -X quit
screen -S bedrock -X stuff "save hold\n"
sleep 10
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
zip -r worlds/data.zip worlds/level.dat worlds/level.dat_old worlds/levelname.txt
git add log worlds
git restore --staged worlds/level.dat worlds/level.dat_old worlds/levelname.txt
git stash push
git checkout -b $currentDate-save
git stash pop
echo "Save: $currentDate" >> log/save-log.txt
git commit -am $currentDate-save
git push origin $currentDate-save
screen -S bedrock -X stuff "save resume\n"
rm worlds/data.zip
su -s /bin/bash -c 'screen -S watch -dm watch /home/ubuntu/scripts/server-autosave.sh' root