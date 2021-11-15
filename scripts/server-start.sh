#!/bin/sh

cd /home/ubuntu
apt update -y
apt upgrade -y
pw=$(aws secretsmanager --region us-east-2 get-secret-value --secret-id repo | jq -r ".SecretString" | jq -r ".repo")
sleep 10
git remote remove origin
git remote add origin https://chalet-le-jar:${pw}@github.com/chiefmikey/chalet-le-jar.git
git checkout main
git fetch --all
git reset --hard origin/main
rm -R worlds log
git checkout origin/$latest worlds.zip log
unzip worlds.zip
rm worlds.zip
echo "Latest: $latest" >> log/startup-log.txt
LD_LIBRARY_PATH=/home/ubuntu su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root
su -s /bin/bash -c 'screen -S watch -dm watch -n 300 /home/ubuntu/scripts/server-autosave.sh' root
