#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
screen -L -S autosave -X quit
screen -L -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 2

screen -L -S bedrock -X stuff "say save in progress...\n"
"${SCRIPTS}"/server-save-action.sh save "${CURRENT_DATE}"
screen -L -S bedrock -X stuff "say save complete!\n"

CURRENT_DATE=${CURRENT_DATE} ACTION=save \
  "${SCRIPTS}"/server-log.sh
cd "${BACKUPS}"/save || exit
ls -1t | tail -n +73 | xargs -d "\n" rm -rf
screen -L -S autosave -dm "${SCRIPTS}"/server-autosave.sh
