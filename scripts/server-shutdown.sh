#!/bin/bash

set -x
set_exports
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
screen -S autosave -X quit
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
cp -r "${BEDROCK}"/worlds/clj "${BACKUPS}"/autosave/"${CURRENT_DATE}"
CURRENT_DATE=${CURRENT_DATE} ACTION=shutdown \
  "${SCRIPTS}"/server-log.sh
cd "${BACKUPS}"/autosave || exit
ls -1t | tail -n +73 | xargs -d "\n" rm -rf
shutdown -h now
