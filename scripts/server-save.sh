#!/bin/bash -v

set -x
cd /home/chalet-le-jar
export currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
screen -S autosave -X quit
screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 2
screen -S bedrock -X stuff "say save in progress...\n"
screen -S bedrock -X stuff "save hold\n"
sleep 10
cp -r worlds/clj backups/autosave/$currentDate
screen -S bedrock -X stuff "save resume\n"
git restore --staged .
git pull --no-edit origin log
echo + Save: $currentDate >> log/history.txt
echo + $currentDate >> log/save-log.txt
git commit -am "save/$currentDate"
git push origin main:log
screen -S bedrock -X stuff "say save complete\n"
cd /home/chalet-le-jar/backups/autosave
ls -1t | tail -n +73 | xargs -d "\n" rm -rf
watch screen -S autosave -dm /home/chalet-le-jar/scripts/server-autosave.sh
echo $currentDate >> log/save-log.txt
