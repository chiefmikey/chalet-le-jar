#!/bin/sh

cd /home/ubuntu
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
echo "Refresh: $currentDate" >> log/refresh-log.txt
screen -S watch -X quit
screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 1
screen -S bedrock -X stuff "say refreshing in 10...9...8...7...6...5...4...3...2...1...\n"
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
wget -O bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.18.1.02.zip
unzip -o bedrock-server.zip
rm bedrock-server.zip
git fetch origin main
git add permissions.json server.properties whitelist.json
git checkout main
git reset --hard origin/main
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
echo "Upgrade: $currentDate" >> log/upgrade-log.txt
