#!/bin/bash -v
sudo cd /home/chalet-le-jar
sudo apt update -y
sudo apt upgrade -y
sudo apt install -y wget zip unzip git jq awscli curl
sudo wget -O bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.18.12.01.zip
sudo unzip -o bedrock-server.zip
sudo rm bedrock-server.zip
export user="chalet-le-jar"
export email="chaletlejar@gmail.com"
export repo="chalet-le-jar"
export owner="chiefmikey"
export awsRegion="us-east-2"
export awsSecretId="repo"
export pw=$(sudo aws secretsmanager --region ${awsRegion} get-secret-value --secret-id ${awsSecretId} | jq -r ".SecretString" | jq -r ".${awsSecretId}")
sudo sleep 10
sudo git init
sudo git config user.name ${user}
sudo git config user.email ${email}
sudo git remote add origin https://${user}:${pw}@github.com/${owner}/${repo}.git
sudo git fetch origin main
sudo git checkout main
sudo git reset --hard origin/main
sudo chmod +x scripts/server-save.sh scripts/server-stop.sh scripts/server-refresh.sh scripts/server-rewind.sh scripts/server-push.sh scripts/server-upgrade.sh
sudo mkdir /home/chalet-le-jar/backups
sudo mkdir /home/chalet-le-jar/backups/autosave
sudo mkdir /home/chalet-le-jar/backups/backup
sudo mkdir /home/chalet-le-jar/worlds
sudo chown -R chalet-le-jar:root /home/chalet-le-jar
export currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
sudo echo "Init: $currentDate" >> logs/init-log.txt
sudo git add logs
sudo git commit -am "Server initialized"
sudo git push origin main