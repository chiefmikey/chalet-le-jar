#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
screen -S autosave -X quit
screen -S bedrock -X stuff "stop\n"
sleep 10
killall screen
git fetch --prune
git checkout main
git reset --hard origin/main
CURRENT_DATE=${CURRENT_DATE} ACTION=refresh \
  "${SCRIPTS}"/server-log.sh
if [ "$(cat "${BEDROCK}"/upgrade.txt)" = upgrade ]; then
  START_SCREENS=y "${SCRIPTS}"/server-upgrade.sh
else
  LD_LIBRARY_PATH=${BEDROCK} screen -S bedrock -dm "${BEDROCK}"/bedrock_server
  screen -S autosave -dm "${SCRIPTS}"/server-autosave.sh
fi
