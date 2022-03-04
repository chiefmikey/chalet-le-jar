#!/bin/bash

cd /home/chalet-le-jar
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
screen -S watch -X quit
screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 2
screen -S bedrock -X stuff "say save in progress...\n"
screen -S bedrock -X stuff "save hold\n"
sleep 10
cp -r worlds/clj backups/save/$currentDate
screen -S bedrock -X stuff "save resume\n"
git restore --staged .
git checkout -b "save/$currentDate"
git commit -am "save/$currentDate"
git push origin "save/$currentDate"
cd /home/chalet-le-jar/backups/save
ls -1t | tail -n +3 | xargs -d "\n" rm -rf
screen -S bedrock -X stuff "say save complete\n"
su -s /bin/bash -c 'screen -S watch -dm watch /home/chalet-le-jar/scripts/server-autosave.sh' root