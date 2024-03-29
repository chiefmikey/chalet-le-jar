#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
screen -S autosave -X quit
screen -S bedrock -X stuff "stop\n"
sleep 5
screen -S autosave -X quit
screen -S bedrock -X quit
git fetch --prune
git checkout main
git reset --hard origin/main
CURRENT_DATE=${CURRENT_DATE} ACTION=refresh \
  "${SCRIPTS}"/server-log.sh
if [ "$(cat "${ROOT}"/upgrade.txt)" = upgrade ]; then
  START_SCREENS=y "${SCRIPTS}"/server-upgrade.sh
else
  LD_LIBRARY_PATH=${ROOT} screen -L -Logfile "${ROOT}"/bedrock.log -S bedrock -dm "${ROOT}"/bedrock_server
  "${SCRIPTS}"/server-active.sh
  sleep 5
  "${SCRIPTS}"/server-ticking.sh
fi
