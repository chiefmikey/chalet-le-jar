#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
screen -S autosave -X quit
screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 2
screen -S bedrock -X stuff "say save in progress...\n"
screen -S bedrock -X stuff "save hold\n"
sleep 10
cp -r "${ROOT}"/worlds/clj "${BACKUPS}"/save/"${CURRENT_DATE}"
screen -S bedrock -X stuff "save resume\n"
CURRENT_DATE=${CURRENT_DATE} ACTION=save \
  "${SCRIPTS}"/server-log.sh
screen -S bedrock -X stuff "say save complete\n"
cd "${BACKUPS}"/save || exit
ls -1t | tail -n +73 | xargs -d "\n" rm -rf
screen -S autosave -dm "${SCRIPTS}"/server-autosave.sh
