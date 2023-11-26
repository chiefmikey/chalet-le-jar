#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
while true; do
  sleep 300
  cd "${ROOT}" || exit
  CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
  screen -S bedrock -X stuff "save hold\n"
  sleep 5
  cp -r "${ROOT}"/worlds/clj "${BACKUPS}"/autosave/"${CURRENT_DATE}"
  screen -S bedrock -X stuff "save resume\n"
  CURRENT_DATE=${CURRENT_DATE} ACTION=autosave \
    "${SCRIPTS}"/server-log.sh
  cd "${BACKUPS}"/autosave || exit
  ls -1t | tail -n +73 | xargs -d "\n" rm -rf
done
