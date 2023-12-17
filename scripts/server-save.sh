#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
screen -S autosave -X quit
screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 2

screen -S bedrock -X stuff "say save in progress...\n"
"${SCRIPTS}"/server-save-action.sh save "${CURRENT_DATE}"
screen -S bedrock -X stuff "say save complete!\n"

CURRENT_DATE=${CURRENT_DATE} ACTION=save \
  "${SCRIPTS}"/server-log.sh
cd "${BACKUPS}"/save || exit
ls -1t | tail -n +73 | xargs -d "\n" rm -rf
"${SCRIPTS}"/server-active.sh
