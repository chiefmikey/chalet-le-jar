#!/bin/sh

INSTANCE_ALREADY_STARTED="INSTANCE_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e ~/$INSTANCE_ALREADY_STARTED ]; then
sudo touch ~/$INSTANCE_ALREADY_STARTED
  echo "-- First instance startup --"
    sudo apt update -y
    sudo apt upgrade -y
    sudo apt install -y wget unzip git jq awscli
    wget https://minecraft.azureedge.net/bin-linux/bedrock-server-1.17.34.02.zip
    unzip bedrock-server-1.17.34.02.zip
    rm bedrock-server-1.17.34.02.zip
    pw=$(aws secretsmanager get-secret-value --secret-id repo | jq -r '.SecretString' | jq -r '.repo')
    git init
    git config credential.helper store
    echo https://chiefmikey:${pw}@github.com > ~/.git-credentials
    chmod 400 ~/.git-credentials
    git remote add origin https://chiefmikey@github.com/chiefmikey/chalet-le-jar.git
    git add permissions.json server.properties whitelist.json
    git pull origin main -f
    LD_LIBRARY_PATH=. screen -S bedrock -dm sudo ./bedrock_server
else
  echo "-- Not first instance startup --"
    sudo apt update -y
    sudo apt upgrade -y
    git pull origin main -f
    LD_LIBRARY_PATH=. screen -S bedrock -dm sudo ./bedrock_server
fi
