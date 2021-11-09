#!/bin/sh

cd /home/ubuntu
apt update -y
apt upgrade -y
pw=$(aws secretsmanager --region us-east-2 get-secret-value --secret-id repo | jq -r ".SecretString" | jq -r ".repo")
sleep 5
git remote remove origin
git remote add origin https://chalet-le-jar:${pw}@github.com/chiefmikey/chalet-le-jar.git
git fetch --all
git checkout main
git reset --hard origin/main
LD_LIBRARY_PATH=/home/ubuntu sudo su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root