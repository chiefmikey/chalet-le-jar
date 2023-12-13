#!/bin/bash

ROOT="/home/chalet-le-jar"
SCRIPTS="${ROOT}/scripts"
BACKUPS="${ROOT}/backups"

set -x
cd "${ROOT}" || exit
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
apt-get update -y
apt-get upgrade -y
apt-get install -y wget zip unzip git jq awscli curl mbuffer
wget -O bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.18.12.01.zip
unzip -o bedrock-server.zip
rm bedrock-server.zip
USER="chalet-le-jar"
EMAIL="chaletlejar@gmail.com"
REPO="chalet-le-jar"
GH_USER="chiefmikey"
AWS_REGION="us-east-2"
AWS_SECRET_ID="chalet-auth"
GH_PASSWORD="$(aws secretsmanager --region "${AWS_REGION}" get-secret-value --secret-id "${AWS_SECRET_ID}" | jq -r ".SecretString" | jq -r .\""${AWS_SECRET_ID}"\")"
sleep 5
git init
git config user.name ${ROOT}
git config user.email ${EMAIL}
git remote add origin https://${ROOT}:"${GH_PASSWORD}"@github.com/${GH_USER}/${REPO}.git
git fetch --prune
git checkout main
git reset --hard origin/main
chmod -R +x "${SCRIPTS}"
mkdir "${BACKUPS}"
mkdir "${BACKUPS}"/autosave
mkdir "${BACKUPS}"/backup
mkdir "${ROOT}"/worlds
chown -R chalet-le-jar:root ${ROOT}
git commit -am "Server initialized: ${CURRENT_DATE}"
git push origin main
CURRENT_DATE=${CURRENT_DATE} ACTION=init \
  "${SCRIPTS}"/server-log.sh
