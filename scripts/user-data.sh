#!/bin/sh

set -x
cd /home/ubuntu
export CURRENT_DATE=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
apt update -y
apt upgrade -y
apt install -y wget zip unzip git jq awscli curl
wget -O bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.19.1.01.zip
unzip -o bedrock-server.zip
rm bedrock-server.zip
export USER="chalet-le-jar"
export EMAIL="chaletlejar@gmail.com"
export REPO="chalet-le-jar"
export GH_USER="chiefmikey"
export AWS_REGION="us-east-2"
export AWS_SECRET_ID="repo"
export GH_PASSWORD=$(aws secretsmanager --region ${AWS_REGION} get-secret-value --secret-id ${AWS_SECRET_ID} | jq -r ".SecretString" | jq -r ".${AWS_SECRET_ID}")
sleep 10
git init
git config user.name ${USER}
git config user.email ${EMAIL}
git remote add origin https://${USER}:${GH_PASSWORD}@github.com/${GH_USER}/${REPO}.git
git fetch --prune
git checkout main
git reset --hard origin/main
chmod +x scripts/server-save.sh scripts/server-stop.sh scripts/server-refresh.sh scripts/server-rewind.sh scripts/server-push.sh scripts/server-upgrade.sh scripts/server-shutdown.sh scripts/server-log.sh
mkdir /home/ubuntu/backups
mkdir /home/ubuntu/backups/autosave
mkdir /home/ubuntu/backups/backup
chown -R ubuntu:root /home/ubuntu
git commit -am "Server initialized: ${CURRENT_DATE}"
git push origin main
CURRENT_DATE=${CURRENT_DATE} ACTION=init \
  /home/chalet-le-jar/scripts/server-log.sh
