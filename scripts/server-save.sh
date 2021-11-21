#!/bin/sh

cd /home/ubuntu
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
screen -S watch -X quit
screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 2
screen -S bedrock -X stuff "say save in progress...\n"
screen -S bedrock -X stuff "save hold\n"
sleep 10
cp -r worlds/clj backups/$currentDate-save
screen -S bedrock -X stuff "save resume\n"
git restore --staged .
git checkout -b $currentDate-save
echo "Save: $currentDate" >> log/save-log.txt
git add log
git commit -am $currentDate-save
git push origin $currentDate-save
cd /home/ubuntu/backups
ls -1t | tail -n +11 | xargs -d "\n" rm -rf
screen -S bedrock -X stuff "say save complete\n"
su -s /bin/bash -c 'screen -S watch -dm watch /home/ubuntu/scripts/server-autosave.sh' root