#!/bin/sh

cd /home/ubuntu
screen -S watch -X quit
screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 2
screen -S bedrock -X stuff "say refreshing in 10...9...8...7...6...5...4...3...2...1...\n"
sleep 2
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 2
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 2
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 2
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 2
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 2
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 2
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 2
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 2
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 2
screen -S bedrock -X stuff "playsound mob.cat.straymeow @a\n"
sleep 2
screen -S bedrock -X stuff "playsound beacon.deactivate @a\n"
sleep 2
screen -S bedrock -X stuff "stop\n"
sleep 10
killall screen
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
zip -r worlds/clj/data.zip worlds/clj/level.dat worlds/clj/level.dat_old worlds/clj/levelname.txt
git add worlds log
git restore --staged worlds/clj/level.dat worlds/clj/level.dat_old worlds/clj/levelname.txt worlds/clj/db/lost
git stash push
git checkout -b $currentDate-shutdown
git stash pop
echo "Shutdown: $currentDate" >> log/shutdown-log.txt
git commit -am $currentDate-shutdown
git push origin $currentDate-shutdown
