#!/bin/bash

ROOT="/home/ubuntu"
SCRIPTS="${ROOT}/scripts"
BEDROCK="${ROOT}/bedrock"
BACKUPS="${BEDROCK}/backups"

set -x
source /home/chalet-le-jar/.bash_aliases
cd /home/ubuntu || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
apt update -y
apt upgrade -y
apt install -y wget zip unzip git jq awscli curl
wget -O bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.19.1.01.zip
unzip -o bedrock-server.zip
rm bedrock-server.zip
GIT_USER="chalet-le-jar"
GIT_EMAIL="chaletlejar@gmail.com"
REPO="chalet-le-jar"
GH_USER="chiefmikey"
AWS_REGION="us-east-2"
AWS_SECRET_ID="chalet-auth"
GH_PASSWORD="$(aws secretsmanager --region "${AWS_REGION}" get-secret-value --secret-id "${AWS_SECRET_ID}" | jq -r ".SecretString" | jq -r .\""${AWS_SECRET_ID}"\")"
sleep 10
git init
git config user.name ${GIT_USER}
git config user.email ${GIT_EMAIL}
git remote add origin https://${ROOT}:"${GH_PASSWORD}"@github.com/${GH_USER}/${REPO}.git
git fetch --prune
git checkout main
git reset --hard origin/main
chmod -R +x scripts
mkdir ${BACKUPS}
mkdir ${BACKUPS}/autosave
mkdir ${BACKUPS}/backup
chown -R ubuntu:root ${ROOT}
git commit -am "Server initialized: ${CURRENT_DATE}"
git push origin main
CURRENT_DATE=${CURRENT_DATE} ACTION=init \
  ${SCRIPTS}/server-log.sh
