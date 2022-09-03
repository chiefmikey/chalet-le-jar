#!/bin/sh

set -x
killall screen
export CURRENT_DATE=$(TZ=":US/Mountain" date +%y-%m-%d_%H-%M-%S)
cd /home/chalet-le-jar
apt update -y
apt upgrade -y
apt autoremove -y
git remote remove origin
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
CURRENT_DATE=${CURRENT_DATE} ACTION=start \
  /home/chalet-le-jar/scripts/server-log.sh
if [ "$(cat /home/chalet-le-jar/upgrade.txt)" = upgrade ]; then
  START_SCREENS=y /home/chalet-le-jar/scripts/server-upgrade.sh
else
  LD_LIBRARY_PATH=/home/chalet-le-jar screen -S bedrock -dm /home/chalet-le-jar/bedrock_server
  screen -S autosave -dm /home/chalet-le-jar/scripts/server-autosave.sh
fi
