#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)

"${SCRIPTS}"/server-countdown.sh
"${SCRIPTS}"/server-save-action.sh autosave "${CURRENT_DATE}"

rm -R "${ROOT}"/worlds/clj
cp -r "${BACKUPS}"/"${1}"/clj "${ROOT}"/worlds/clj
CURRENT_DATE=${CURRENT_DATE} ACTION=rewind \
  "${SCRIPTS}"/server-log.sh
LD_LIBRARY_PATH=${ROOT} screen -L -S bedrock -dm "${ROOT}"/bedrock_server
screen -L -S autosave -dm "${SCRIPTS}"/server-autosave.sh
