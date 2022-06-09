#!/bin/bash -v

set -x
cd /home/chalet-le-jar
export currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
screen -S watch -X quit
screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 1
screen -S bedrock -X stuff "say stopping in 10...9...8...7...6...5...4...3...2...1...\n"
sleep 1
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 1
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 1
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 1
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 1
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 1
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 1
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 1
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 1
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 1
screen -S bedrock -X stuff "playsound beacon.deactivate @a\n"
sleep 1
screen -S bedrock -X stuff "stop\n"
sleep 10
killall screen
cp -r worlds/clj backups/autosave/$currentDate
git restore --staged .
git pull origin log
echo + Shutdown: $currentDate >> log/history.txt
echo + $currentDate >> log/shutdown-log.txt
git commit -am "shutdown/$currentDate"
git push origin main:log
cd /home/chalet-le-jar/backups/autosave
ls -1t | tail -n +73 | xargs -d "\n" rm -rf
shutdown -h now
