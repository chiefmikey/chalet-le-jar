#!/bin/sh

INSTANCE_ALREADY_STARTED="INSTANCE_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e ~/$INSTANCE_ALREADY_STARTED ]; then
sudo touch ~/$INSTANCE_ALREADY_STARTED
  echo "-- First instance startup --"
    sudo apt update -y
    sudo apt upgrade -y
    sudo apt install -y wget unzip git gitsome jq
    git config --global user.name "chiefmikey"
    git config --global user.email "wolfemikl@gmail.com"
    git init
    git remote add origin https://github.com/chiefmikey/chalet-le-jar.git
    wget https://minecraft.azureedge.net/bin-linux/bedrock-server-1.17.34.02.zip
    unzip bedrock-server-1.17.34.02.zip
    rm bedrock-server-1.17.34.02.zip
    wget -O ~/awscliv2.zip https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip
    unzip ~/awscliv2.zip
    sudo ~/aws/install
    pw=$(aws secretsmanager get-secret-value --secret-id profile-languages | jq -r '.SecretString' | jq '.TOKEN')


    git init
    git config --global user.name "chiefmikey"
    git config --global user.email "wolfemikl@gmail.com"
    git add permissions.json server.properties whitelist.json

    git pull origin main -f
    LD_LIBRARY_PATH=. screen -S bedrock -dm sudo ./bedrock_server
else
  echo "-- Not first instance startup --"
    sudo apt update -y
    sudo apt upgrade -y
    git pull origin main
    LD_LIBRARY_PATH=. screen -S bedrock -dm sudo ./bedrock_server
fi
