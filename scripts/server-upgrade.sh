#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
wget -O bedrock-server.zip "https://minecraft.azureedge.net/bin-linux/bedrock-server-1.20.51.01.zip"
unzip -o bedrock-server.zip
rm bedrock-server.zip
git fetch --prune
git checkout main
git reset --hard origin/main
echo "# upgrade" > "${ROOT}"/upgrade.txt
git commit -am "Disable upgrade: ${CURRENT_DATE}"
git push origin main
CURRENT_DATE=${CURRENT_DATE} ACTION=upgrade \
  "${SCRIPTS}"/server-log.sh
if [ "${START_SCREENS}" = "y" ]; then
  LD_LIBRARY_PATH=${ROOT} screen -L -S bedrock -dm "${ROOT}"/bedrock_server
  screen -L -S autosave -dm "${SCRIPTS}"/server-autosave.sh
  sleep 5
  "${SCRIPTS}"/server-ticking.sh
fi
