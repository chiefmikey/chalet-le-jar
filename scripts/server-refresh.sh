#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
screen -L -S autosave -X quit
screen -L -S bedrock -X stuff "stop\n"
sleep 5
screen -L -S autosave -X quit
screen -L -S bedrock -X quit
git fetch --prune
git checkout main
git reset --hard origin/main
CURRENT_DATE=${CURRENT_DATE} ACTION=refresh \
  "${SCRIPTS}"/server-log.sh
if [ "$(cat "${ROOT}"/upgrade.txt)" = upgrade ]; then
  START_SCREENS=y "${SCRIPTS}"/server-upgrade.sh
else
  LD_LIBRARY_PATH=${ROOT} screen -L -S bedrock -dm "${ROOT}"/bedrock_server
  screen -L -S autosave -dm "${SCRIPTS}"/server-autosave.sh
fi
