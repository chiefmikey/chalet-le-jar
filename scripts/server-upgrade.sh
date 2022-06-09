#!/bin/bash -v

set -x
cd /home/chalet-le-jar
export CURRENT_DATE=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
wget -O bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.19.1.01.zip
unzip -o bedrock-server.zip
rm bedrock-server.zip
git fetch --prune
git checkout main
git reset --hard origin/main
CURRENT_DATE=$CURRENT_DATE ACTION=upgrade \
  /home/chalet-le-jar/scripts/server-log.sh
LD_LIBRARY_PATH=/home/chalet-le-jar screen -S bedrock -dm /home/chalet-le-jar/bedrock_server
screen -S autosave -dm /home/chalet-le-jar/scripts/server-autosave.sh
