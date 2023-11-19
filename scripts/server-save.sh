#!/bin/sh

set -x
cd /home/chalet-le-jar || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
screen -S autosave -X quit
screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 2
screen -S bedrock -X stuff "say save in progress...\n"
screen -S bedrock -X stuff "save hold\n"
sleep 10
cp -r worlds/clj backups/save/"${CURRENT_DATE}"
screen -S bedrock -X stuff "save resume\n"
CURRENT_DATE=${CURRENT_DATE} ACTION=save \
  /home/chalet-le-jar/scripts/server-log.sh
screen -S bedrock -X stuff "say save complete\n"
cd /home/chalet-le-jar/backups/save || exit
ls -1t | tail -n +73 | xargs -d "\n" rm -rf
LD_LIBRARY_PATH=/home/chalet-le-jar screen -S bedrock -dm /home/chalet-le-jar/bedrock_server
screen -S autosave -dm /home/chalet-le-jar/scripts/server-autosave.sh
