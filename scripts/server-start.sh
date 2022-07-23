#!/bin/sh

set -x
killall screen
export CURRENT_DATE=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
cd /home/chalet-le-jar
apt update -y
apt upgrade -y
apt autoremove -y
git remote remove origin
export user="chalet-le-jar"
export email="chaletlejar@gmail.com"
export repo="chalet-le-jar"
export owner="chiefmikey"
export awsRegion="us-east-2"
export awsSecretId="repo"
export pw=$(aws secretsmanager --region ${awsRegion} get-secret-value --secret-id ${awsSecretId} | jq -r ".SecretString" | jq -r ".${awsSecretId}")
sleep 10
git init
git config user.name ${user}
git config user.email ${email}
git remote add origin https://${user}:${pw}@github.com/${owner}/${repo}.git
git fetch --prune
git checkout main
git reset --hard origin/main
CURRENT_DATE=$CURRENT_DATE ACTION=start \
  /home/chalet-le-jar/scripts/server-log.sh
if [ "$(cat /home/chalet-le-jar/upgrade.txt)" = upgrade ]; then
  /home/chalet-le-jar/scripts/server-upgrade.sh
else
  LD_LIBRARY_PATH=/home/chalet-le-jar screen -S bedrock -dm /home/chalet-le-jar/bedrock_server
  screen -S autosave -dm /home/chalet-le-jar/scripts/server-autosave.sh
fi
