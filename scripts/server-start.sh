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
git checkout origin/$latest worlds/data.zip log
rm -R worlds/level.dat worlds/level.dat_old worlds/levelname.txt log
unzip worlds/data.zip -d worlds
rm worlds/data.zip
echo "Latest: $latest" >> log/startup-log.txt
LD_LIBRARY_PATH=/home/ubuntu su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root
su -s /bin/bash -c 'screen -S watch -dm watch /home/ubuntu/scripts/server-autosave.sh' root
