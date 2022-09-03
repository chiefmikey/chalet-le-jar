#!/bin/sh

set -x
cd /home/chalet-le-jar
export CURRENT_DATE=$(TZ=":US/Mountain" date +%y-%m-%d_%H-%M-%S)
wget -O bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.19.22.01.zip
unzip -o bedrock-server.zip
rm bedrock-server.zip
git fetch --prune
git checkout main
git reset --hard origin/main
CURRENT_DATE=${CURRENT_DATE} ACTION=upgrade \
  /home/chalet-le-jar/scripts/server-log.sh
