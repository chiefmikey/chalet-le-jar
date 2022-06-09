#!/bin/bash -v

set -x
killall screen
export currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
cd /home/chalet-le-jar
apt update -y
apt upgrade -y
apt autoremove -y
git remote remove origin
export pw=$(aws secretsmanager --region us-east-2 get-secret-value --secret-id repo | jq -r ".SecretString" | jq -r ".repo")
sleep 10
git remote add origin https://chalet-le-jar:${pw}@github.com/chiefmikey/chalet-le-jar.git
git fetch --prune
git checkout main
git reset --hard origin/main
git pull --no-edit origin log
echo + Start: $currentDate >> log/history.txt
echo + $currentDate >> log/start-log.txt
git commit -am "start/$currentDate"
git push origin main:log
if [ "$(cat /home/chalet-le-jar/upgrade.txt)" = upgrade ]; then
  /home/chalet-le-jar/scripts/server-upgrade.sh
else
  LD_LIBRARY_PATH=/home/chalet-le-jar screen -S bedrock -dm /home/chalet-le-jar/bedrock_server
  screen -S autosave -dm /home/chalet-le-jar/scripts/server-autosave.sh
fi
