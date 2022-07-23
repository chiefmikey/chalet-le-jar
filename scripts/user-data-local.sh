#!/bin/sh

set -x
cd /home/chalet-le-jar
export CURRENT_DATE=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
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
export pw=$(aws secretsmanager --region ${awsRegion} get-secret-value --secret-id ${awsSecretId} | jq -r ".SecretString" | jq -r ".${awsSecretId}")
sleep 10
git init
git config user.name ${user}
git config user.email ${email}
git remote add origin https://${user}:${pw}@github.com/${owner}/${repo}.git
git fetch --prune
git checkout main
git reset --hard origin/main
chmod +x scripts/server-save.sh scripts/server-stop.sh scripts/server-refresh.sh scripts/server-rewind.sh scripts/server-push.sh scripts/server-upgrade.sh scripts/server-shutdown.sh scripts/server-log.sh
mkdir /home/chalet-le-jar/backups
mkdir /home/chalet-le-jar/backups/autosave
mkdir /home/chalet-le-jar/backups/backup
mkdir /home/chalet-le-jar/worlds
chown -R chalet-le-jar:root /home/chalet-le-jar
git commit -am "Server initialized: $CURRENT_DATE"
git push origin main
CURRENT_DATE=$CURRENT_DATE ACTION=init \
  /home/chalet-le-jar/scripts/server-log.sh
