#!/bin/bash

cd /home/chalet-le-jar
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
wget -O bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.19.1.01.zip
unzip -o bedrock-server.zip
rm bedrock-server.zip
git fetch origin main
git checkout main
git reset --hard origin/main
