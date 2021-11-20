#!/bin/sh

sleep 600
cd /home/ubuntu
screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 2
screen -S bedrock -X stuff "say autosave in progress...\n"
screen -S bedrock -X stuff "save hold\n"
sleep 10
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
zip -r worlds/clj/data.zip worlds/clj/level.dat worlds/clj/level.dat_old worlds/clj/levelname.txt
git add log worlds
git restore --staged worlds/clj/level.dat worlds/clj/level.dat_old worlds/clj/levelname.txt worlds/clj/db/lost
git stash push
git checkout -b $currentDate-autosave
git stash pop
echo "Autosave: $currentDate" >> log/autosave-log.txt
git commit -am $currentDate-autosave
git push origin $currentDate-autosave
screen -S bedrock -X stuff "save resume\n"
screen -S bedrock -X stuff "say autosave complete\n"
rm worlds/clj/data.zip
