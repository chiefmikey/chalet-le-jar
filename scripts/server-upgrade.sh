#!/bin/bash

set -x
set_exports
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
wget -O bedrock-server.zip "https://minecraft.azureedge.net/bin-linux/bedrock-server-1.20.41.02.zip"
unzip -o bedrock-server.zip
rm bedrock-server.zip
git fetch --prune
git checkout main
git reset --hard origin/main
echo "# upgrade" > "${BEDROCK}"/upgrade.txt
git commit -am "Disable upgrade: ${CURRENT_DATE}"
git push origin main
CURRENT_DATE=${CURRENT_DATE} ACTION=upgrade \
  "${SCRIPTS}"/server-log.sh
if [ "${START_SCREENS}" = "y" ]; then
  LD_LIBRARY_PATH=${BEDROCK} screen -S bedrock -dm "${BEDROCK}"/bedrock_server
  screen -S autosave -dm "${SCRIPTS}"/server-autosave.sh
fi
