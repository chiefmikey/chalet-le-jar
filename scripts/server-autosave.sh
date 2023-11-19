#!/bin/sh

set -x
while true; do
  sleep 300
  cd /home/chalet-le-jar || exit
  CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
  screen -S bedrock -X stuff "save hold\n"
  sleep 10
  cp -r worlds/clj backups/autosave/"${CURRENT_DATE}"
  screen -S bedrock -X stuff "save resume\n"
  CURRENT_DATE=${CURRENT_DATE} ACTION=autosave \
    /home/chalet-le-jar/scripts/server-log.sh
  cd /home/chalet-le-jar/backups/autosave || exit
  ls -1t | tail -n +73 | xargs -d "\n" rm -rf
done
