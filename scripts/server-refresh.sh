#!/bin/bash -v

set -x
cd /home/chalet-le-jar
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
git fetch origin main
git checkout main
git reset --hard origin/main
if [ "$(cat /home/chalet-le-jar/upgrade.txt)" = upgrade ]; then
  su -s /bin/bash -c '/home/chalet-le-jar/scripts/server-upgrade.sh' root
else
  LD_LIBRARY_PATH=/home/chalet-le-jar su -s /bin/bash -c 'screen -dmS bedrock /home/chalet-le-jar/bedrock_server' root
  su -s /bin/bash -c 'screen watch -dmS autosave /home/chalet-le-jar/scripts/server-autosave.sh' root
fi
