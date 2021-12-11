#!/bin/bash

cd /home/ubuntu
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
echo "Save: $currentDate" >> log/save-log.txt
git add log
git commit -am "save/$currentDate"
git push origin "save/$currentDate"
cd /home/ubuntu/backups/save
ls -1t | tail -n +6 | xargs -d "\n" rm -rf
screen -S bedrock -X stuff "say save complete\n"
su -s /bin/bash -c 'screen -S watch -dm watch /home/ubuntu/scripts/server-autosave.sh' root