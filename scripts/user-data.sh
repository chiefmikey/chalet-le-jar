#!/bin/bash
cd /home/ubuntu
apt update -y
apt upgrade -y
apt install -y wget zip unzip git jq awscli curl
wget -O bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.18.12.01.zip
unzip -o bedrock-server.zip
rm bedrock-server.zip
git init
git config user.name chalet-le-jar
git config user.email chaletlejar@gmail.com
export pw=$(sudo aws secretsmanager --region us-east-2 get-secret-value --secret-id repo | jq -r ".SecretString" | jq -r ".repo")
sleep 10
git remote add origin https://chalet-le-jar:${pw}@github.com/chiefmikey/chalet-le-jar.git
git fetch origin main
git checkout main
git reset --hard origin/main
chmod +x scripts/server-save.sh scripts/server-stop.sh scripts/server-refresh.sh scripts/server-rewind.sh scripts/server-push.sh scripts/server-upgrade.sh
mkdir /home/ubuntu/backups
mkdir /home/ubuntu/backups/save
mkdir /home/ubuntu/backups/autosave
mkdir /home/ubuntu/backups/backup
chown -R ubuntu:root /home/ubuntu
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
echo "Init: $currentDate" >> logs/init-log.txt
git add logs
git commit -am "Server initialized"
git push origin main
