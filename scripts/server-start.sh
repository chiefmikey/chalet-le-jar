#!/bin/sh

cd /home/ubuntu
apt update -y
apt upgrade -y
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
pw=$(aws secretsmanager --region us-east-2 get-secret-value --secret-id repo | jq -r ".SecretString" | jq -r ".repo")
sleep 10
git remote remove origin
git remote add origin https://chalet-le-jar:${pw}@github.com/chiefmikey/chalet-le-jar.git
git fetch --all
git checkout main
git reset --hard origin/main
cp -r worlds/clj backups/$currentDate-start
killall screen
LD_LIBRARY_PATH=/home/ubuntu su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root
su -s /bin/bash -c 'screen -S watch -dm watch /home/ubuntu/scripts/server-autosave.sh' root
currentDate=$currentDate su -s /bin/bash -c 'screen -S push -dm currentDate=$currentDate /home/ubuntu/scripts/server-push.sh' root
