#!/bin/sh

cd /home/ubuntu
INSTANCE_ALREADY_STARTED="INSTANCE_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e /home/ubuntu/$INSTANCE_ALREADY_STARTED ]; then
sudo touch /home/ubuntu/$INSTANCE_ALREADY_STARTED
  echo "-- First instance startup --"
    sudo apt update -y
    sudo apt upgrade -y
    sudo apt install -y wget unzip git jq awscli
    wget -O /home/ubuntu/bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.17.40.06.zip
    unzip /home/ubuntu/bedrock-server.zip
    rm /home/ubuntu/bedrock-server.zip
    pw=$(aws secretsmanager get-secret-value --secret-id repo | jq -r ".SecretString" | jq -r ".repo")
    git init
    git config credential.helper store
    echo https://chalet-le-jar:${pw}@github.com > /home/ubuntu/.git-credentials
    chmod 400 /home/ubuntu/.git-credentials
    git config user.name chalet-le-jar
    git config user.email chaletlejar@gmail.com
    git remote add origin https://chalet-le-jar@github.com/chiefmikey/chalet-le-jar.git
    git checkout main
    git add permissions.json server.properties whitelist.json
    git pull --no-edit origin main -f
    chmod +x /home/ubuntu/server-backup.sh /home/ubuntu/server-stop.sh /home/ubuntu/server-init.sh
    git commit -am "Initialize server"
    git push origin main
    LD_LIBRARY_PATH=. screen -S bedrock -dm sudo /home/ubuntu/bedrock_server
else
  echo "-- Not first instance startup --"
    sudo apt update -y
    sudo apt upgrade -y
    git checkout main
    git pull --no-edit origin main -f
    LD_LIBRARY_PATH=. screen -S bedrock -dm sudo /home/ubuntu/bedrock_server
fi
