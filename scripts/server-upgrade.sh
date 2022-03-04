#!/bin/bash

cd /home/chalet-le-jar
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
wget -O bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.18.12.01.zip
unzip -o bedrock-server.zip
rm bedrock-server.zip
git fetch origin main
git add permissions.json server.properties whitelist.json
git checkout main
git reset --hard origin/main
LD_LIBRARY_PATH=/home/chalet-le-jar su -s /bin/bash -c 'screen -S bedrock -dm /home/chalet-le-jar/bedrock_server' root
su -s /bin/bash -c 'screen -S watch -dm watch /home/chalet-le-jar/scripts/server-autosave.sh' root
