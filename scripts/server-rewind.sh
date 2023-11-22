#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
"${SCRIPTS}"/server-countdown.sh
# make temp save backup in case of corruption
rm -R "${ROOT}"/worlds/clj
cp -r "${BACKUPS}"/"${1}" "${ROOT}"/worlds/clj
CURRENT_DATE=${CURRENT_DATE} ACTION=rewind \
  "${SCRIPTS}"/server-log.sh
LD_LIBRARY_PATH=${ROOT} screen -S bedrock -dm "${ROOT}"/bedrock_server
screen -S autosave -dm "${SCRIPTS}"/server-autosave.sh
