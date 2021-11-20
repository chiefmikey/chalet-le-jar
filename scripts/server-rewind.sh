#!/bin/sh

cd /home/ubuntu
screen -S watch -X quit
screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 2
screen -S bedrock -X stuff "say rewinding in 10...9...8...7...6...5...4...3...2...1...\n"
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
git add log worlds
git restore --staged worlds/clj/level.dat worlds/clj/level.dat_old worlds/clj/levelname.txt worlds/clj/db/lost
git stash push
git checkout -b $currentDate-rewind
git stash pop
echo "Current: $currentDate" >> log/rewind-log.txt
echo "Backup: $branch" >> log/rewind-log.txt
git commit -am $currentDate-rewind
git push origin $currentDate-rewind
rm worlds/clj/data.zip
git fetch --all
git checkout main
git reset --hard origin/main
git checkout origin/$branch worlds
unzip -o worlds/clj/data.zip
rm worlds/clj/data.zip
LD_LIBRARY_PATH=/home/ubuntu su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root
su -s /bin/bash -c 'screen -S watch -dm watch /home/ubuntu/scripts/server-autosave.sh' root
