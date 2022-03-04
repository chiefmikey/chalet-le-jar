#!/bin/bash

cd /home/chalet-le-jar
export currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
screen -S watch -X quit
screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 2
screen -S bedrock -X stuff "say save in progress...\n"
screen -S bedrock -X stuff "save hold\n"
sleep 10
cp -r worlds/clj backups/autosave/$currentDate
screen -S bedrock -X stuff "save resume\n"
git restore --staged .
git checkout -b "autosave/$currentDate"
git commit -am "autosave/$currentDate"
git push origin "autosave/$currentDate"
screen -S bedrock -X stuff "say save complete\n"
git fetch --prune
git branch -r --sort=committerdate | head -n 1 | sed 's/  origin\///' | xargs git push origin --delete
cd /home/chalet-le-jar/backups/autosave
ls -1t | tail -n +73 | xargs -d "\n" rm -rf
su -s /bin/bash -c 'screen -S watch -dm watch /home/chalet-le-jar/scripts/server-autosave.sh' root
