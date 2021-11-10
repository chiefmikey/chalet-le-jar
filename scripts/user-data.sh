Content-Type: multipart/mixed; boundary="//"
MIME-Version: 1.0

--//
Content-Type: text/cloud-config; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="cloud-config.txt"

#cloud-config
cloud_final_modules:
- [scripts-user, always]

--//
Content-Type: text/x-shellscript; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="userdata.txt"

#!/bin/bash
cd /home/ubuntu
INSTANCE_ALREADY_STARTED="INSTANCE_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e /home/ubuntu/$INSTANCE_ALREADY_STARTED ]; then
touch /home/ubuntu/$INSTANCE_ALREADY_STARTED
  echo "-- First instance startup --"
    apt update -y
    apt upgrade -y
    apt install -y wget unzip git jq awscli curl
    wget -O /home/ubuntu/bedrock-server.zip https://minecraft.azureedge.net/bin-linux/bedrock-server-1.17.41.01.zip
    unzip /home/ubuntu/bedrock-server.zip
    rm /home/ubuntu/bedrock-server.zip
    pw=$(aws secretsmanager --region us-east-2 get-secret-value --secret-id repo | jq -r ".SecretString" | jq -r ".repo")
    sleep 5
    git init
    git config user.name chalet-le-jar
    git config user.email chaletlejar@gmail.com
    git remote add origin https://chalet-le-jar:${pw}@github.com/chiefmikey/chalet-le-jar.git
    git add /home/ubuntu/permissions.json /home/ubuntu/server.properties /home/ubuntu/whitelist.json
    git commit -am 'Properties initialized'
    git fetch --all
    git checkout main
    git reset --hard origin/main
    chmod +x /home/ubuntu/scripts/server-save.sh /home/ubuntu/scripts/server-stop.sh /home/ubuntu/scripts/server-refresh.sh /home/ubuntu/scripts/server-rewind.sh
    chown -R ubuntu:root /home/ubuntu
    currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
    echo $currentDate >> /home/ubuntu/log/startup-log.txt
    git commit -am "Server initialized"
    git push origin main
    LD_LIBRARY_PATH=/home/ubuntu sudo su -s /bin/bash -c 'screen -S bedrock -dm /home/ubuntu/bedrock_server' root
else
  echo "-- Not first instance startup --"
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
fi
--//--
