#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)

"${SCRIPTS}"/server-countdown.sh
"${SCRIPTS}"/server-save-action.sh autosave "${CURRENT_DATE}"

CURRENT_DATE=${CURRENT_DATE} ACTION=stop \
  "${SCRIPTS}"/server-log.sh
cd "${BACKUPS}"/autosave || exit
ls -1t | tail -n +73 | xargs -d "\n" rm -rf
