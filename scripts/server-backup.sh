#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
cp -r "${ROOT}"/worlds/clj "${BACKUPS}"/backup/"${CURRENT_DATE}"
git add "backups/backup/${CURRENT_DATE}"
git stash push
git checkout -b "backup/${CURRENT_DATE}"
git stash pop
git commit -am "backup/${CURRENT_DATE}"
CURRENT_DATE=${CURRENT_DATE} screen -S push -dm "${SCRIPTS}"/server-push.sh
