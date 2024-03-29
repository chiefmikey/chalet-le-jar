#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)

screen -S autosave -X quit
"${SCRIPTS}"/server-countdown.sh
"${SCRIPTS}"/server-save-action.sh autosave "${CURRENT_DATE}"
screen -S bedrock -X stuff "stop\n"

rm -R "${ROOT}"/worlds/clj
cp -r "${BACKUPS}"/"${1}"/clj "${ROOT}"/worlds/clj
CURRENT_DATE=${CURRENT_DATE} ACTION=rewind \
  "${SCRIPTS}"/server-log.sh
LD_LIBRARY_PATH=${ROOT} screen -L -Logfile "${ROOT}"/bedrock.log -S bedrock -dm "${ROOT}"/bedrock_server
"${SCRIPTS}"/server-active.sh
sleep 5
"${SCRIPTS}"/server-ticking.sh
