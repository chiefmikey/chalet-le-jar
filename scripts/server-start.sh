#!/bin/bash -v

set -x
killall screen
cd /home/chalet-le-jar
apt update -y
apt upgrade -y
git remote remove origin
export pw=$(aws secretsmanager --region us-east-2 get-secret-value --secret-id repo | jq -r ".SecretString" | jq -r ".repo")
sleep 10
git remote add origin https://chalet-le-jar:${pw}@github.com/chiefmikey/chalet-le-jar.git
git fetch origin main
git checkout main
git reset --hard origin/main
if [ "$(cat /home/chalet-le-jar/upgrade.txt)" = upgrade ]; then
  su -s /bin/bash -c '/home/chalet-le-jar/scripts/server-upgrade.sh' root
else
  LD_LIBRARY_PATH=/home/chalet-le-jar su -s /bin/bash -c 'screen -S bedrock -dm /home/chalet-le-jar/bedrock_server' root
  su -s /bin/bash -c 'screen -S autosave -dm watch /home/chalet-le-jar/scripts/server-autosave.sh' root
fi
