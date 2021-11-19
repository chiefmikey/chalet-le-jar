#!/bin/sh

cd /home/ubuntu
screen -S watch -X quit
screen -S bedrock -X stuff "save hold\n"
sleep 10
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
zip -r worlds/clj/data.zip worlds/clj/level.dat worlds/clj/level.dat_old worlds/clj/levelname.txt
git add log worlds
git restore --staged worlds/clj/level.dat worlds/clj/level.dat_old worlds/clj/levelname.txt worlds/clj/db/lost
git stash push
git checkout -b $currentDate-save
git stash pop
echo "Save: $currentDate" >> log/save-log.txt
git commit -am $currentDate-save
git push origin $currentDate-save
screen -S bedrock -X stuff "save resume\n"
rm worlds/clj/data.zip
su -s /bin/bash -c 'screen -S watch -dm watch /home/ubuntu/scripts/server-autosave.sh' root