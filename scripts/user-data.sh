#!/bin/bash
cd /home/ubuntu
apt update -y
apt upgrade -y
apt install -y wget zip unzip git jq awscli curl
wget -O bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.17.41.01.zip
unzip -o bedrock-server.zip
rm bedrock-server.zip
pw=$(aws secretsmanager --region us-east-2 get-secret-value --secret-id repo | jq -r ".SecretString" | jq -r ".repo")
sleep 10
git init
git config user.name chalet-le-jar
git config user.email chaletlejar@gmail.com
git remote add origin https://chalet-le-jar:${pw}@github.com/chiefmikey/chalet-le-jar.git
git fetch --all
git add permissions.json server.properties whitelist.json
git checkout main
git reset --hard origin/main
chmod +x scripts/server-save.sh scripts/server-stop.sh scripts/server-refresh.sh scripts/server-rewind.sh scripts/server-push.sh
chown -R ubuntu:root /home/ubuntu
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
echo "Init: $currentDate" >> log/init-log.txt
git commit -am "Server initialized"
git push origin main
mkdir /home/ubuntu/backups
