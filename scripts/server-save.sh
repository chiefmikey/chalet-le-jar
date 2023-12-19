#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)

# check if autosave is running
if screen -list | grep -q "autosave"; then
  AUTOSAVE_WAS_RUNNING=true
  screen -S autosave -X quit
else
  AUTOSAVE_WAS_RUNNING=false
fi

screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 2

screen -S bedrock -X stuff "say save in progress...\n"
"${SCRIPTS}"/server-save-action.sh save "${CURRENT_DATE}"
screen -S bedrock -X stuff "say save complete!\n"

CURRENT_DATE=${CURRENT_DATE} ACTION=save \
  "${SCRIPTS}"/server-log.sh
cd "${BACKUPS}"/save || exit
ls -1t | tail -n +73 | xargs -d "\n" rm -rf

# start autosave again if it was running
if $AUTOSAVE_WAS_RUNNING; then
  screen -L -Logfile "${AUTOSAVE_LOG}" -S autosave -dm "${SCRIPTS}/server-autosave.sh"
fi
