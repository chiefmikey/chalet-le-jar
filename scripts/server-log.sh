#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
git restore --staged .
git -C "${LOG}" pull --rebase=false --autostash --no-edit origin log
cat "${LOG}"/history.txt >> "${LOG}"/temp-history.txt
cat "${LOG}"/"${ACTION}"-log.txt >> "${LOG}"/temp-"${ACTION}"-log.txt
echo "${ACTION}": "${CURRENT_DATE}" > "${LOG}"/history.txt
echo "${CURRENT_DATE}" > "${LOG}"/"${ACTION}"-log.txt
cat "${LOG}"/temp-history.txt >> "${LOG}"/history.txt
cat "${LOG}"/temp-"${ACTION}"-log.txt >> "${LOG}"/"${ACTION}"-log.txt
rm "${LOG}"/temp-history.txt "${LOG}"/temp-"${ACTION}"-log.txt
git commit -am "${ACTION}/${CURRENT_DATE}"
git push -f origin main:log
git reset --hard origin/main
