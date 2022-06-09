#!/bin/bash -v

set -x
cd /home/chalet-le-jar
export currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
wget -O bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.19.1.01.zip
unzip -o bedrock-server.zip
rm bedrock-server.zip
git fetch --prune
git checkout main
git reset --hard origin/main
git pull --no-edit origin log
echo + Upgrade: $currentDate >> log/history.txt
echo + $currentDate >> log/upgrade-log.txt
git commit -am "upgrade/$currentDate"
git push origin main:log
LD_LIBRARY_PATH=/home/chalet-le-jar screen -S bedrock -dm /home/chalet-le-jar/bedrock_server
watch screen -S autosave -dm /home/chalet-le-jar/scripts/server-autosave.sh
