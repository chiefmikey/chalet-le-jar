#!/bin/sh

set -x
cd /home/chalet-le-jar || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
export CURRENT_DATE
screen -S autosave -X quit
screen -S bedrock -X stuff "stop\n"
sleep 10
killall screen
git fetch --prune
git checkout main
git reset --hard origin/main
CURRENT_DATE=${CURRENT_DATE} ACTION=refresh \
  /home/chalet-le-jar/scripts/server-log.sh
if [ "$(cat /home/chalet-le-jar/upgrade.txt)" = upgrade ]; then
  START_SCREENS=y /home/chalet-le-jar/scripts/server-upgrade.sh
else
  LD_LIBRARY_PATH=/home/chalet-le-jar screen -S bedrock -dm /home/chalet-le-jar/bedrock_server
  screen -S autosave -dm /home/chalet-le-jar/scripts/server-autosave.sh
fi
