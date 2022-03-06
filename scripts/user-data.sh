#!/bin/bash
cd /home/ubuntu
apt update -y
apt upgrade -y
apt install -y wget zip unzip git jq awscli curl
wget -O bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.18.12.01.zip
unzip -o bedrock-server.zip
rm bedrock-server.zip
export user="chalet-le-jar"
export email="chaletlejar@gmail.com"
export repo="chalet-le-jar"
export owner="chiefmikey"
export awsRegion="us-east-2"
export awsSecretId="repo"
export pw=$(sudo aws secretsmanager --region ${awsRegion} get-secret-value --secret-id ${awsSecretId} | jq -r ".SecretString" | jq -r ".${awsSecretId}")
sleep 10
git init
git config user.name ${user}
git config user.email ${email}
git remote add origin https://${user}:${pw}@github.com/${owner}/${repo}.git
git fetch origin main
git checkout main
git reset --hard origin/main
chmod +x scripts/server-save.sh scripts/server-stop.sh scripts/server-refresh.sh scripts/server-rewind.sh scripts/server-push.sh scripts/server-upgrade.sh scripts/server-shutdown.sh
mkdir /home/ubuntu/backups
mkdir /home/ubuntu/backups/autosave
mkdir /home/ubuntu/backups/backup
chown -R ubuntu:root /home/ubuntu
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
echo "Init: $currentDate" >> logs/init-log.txt
git add logs
git commit -am "Server initialized"
git push origin main
