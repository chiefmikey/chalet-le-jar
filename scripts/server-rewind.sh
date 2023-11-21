#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
screen -S autosave -X quit
screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 1
screen -S bedrock -X stuff "say rewinding in 10...9...8...7...6...5...4...3...2...1...\n"
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
# make temp save backup in case of corruption
rm -R worlds/clj
cp -r backups/"${1}" worlds/clj
CURRENT_DATE=${CURRENT_DATE} ACTION=rewind \
  "${SCRIPTS}"/server-log.sh
LD_LIBRARY_PATH=${BEDROCK} screen -S bedrock -dm "${BEDROCK}"/bedrock_server
screen -S autosave -dm "${SCRIPTS}"/server-autosave.sh
