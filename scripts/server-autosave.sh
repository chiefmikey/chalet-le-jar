#!/bin/sh

sleep 360
cd /home/ubuntu
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
screen -S bedrock -X stuff "save hold\n"
sleep 10
cp -r worlds/clj backups/$currentDate-autosave
screen -S bedrock -X stuff "save resume\n"
git restore --staged .
git checkout -b $currentDate-autosave
echo "Autosave: $currentDate" >> log/autosave-log.txt
git add log
git commit -am $currentDate-autosave
git push origin $currentDate-autosave
cd /home/ubuntu/backups
ls -1t | tail -n +11 | xargs -d "\n" rm -rf
