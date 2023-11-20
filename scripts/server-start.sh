#!/bin/sh

set -x
killall screen
CURRENT_DATE=$(TZ=:US/Mountain date +%m-%d-%y_%H:%M:%S)
cd "${USER}" || exit
"${SCRIPTS}"/server-system.sh
git remote remove origin
USER="chalet-le-jar"
EMAIL="chaletlejar@gmail.com"
REPO="chalet-le-jar"
GH_USER="chiefmikey"
AWS_REGION="us-east-2"
AWS_SECRET_ID="chalet-auth"
GH_PASSWORD="$(aws secretsmanager --region "${AWS_REGION}" get-secret-value --secret-id "${AWS_SECRET_ID}" | jq -r ".SecretString" | jq -r .\""${AWS_SECRET_ID}"\")"
sleep 10
git init
git config user.name ${USER}
git config user.email ${EMAIL}
git remote add origin https://${USER}:"${GH_PASSWORD}"@github.com/${GH_USER}/${REPO}.git
git fetch --prune
git checkout main
git reset --hard origin/main
CURRENT_DATE=${CURRENT_DATE} ACTION=start \
  "${SCRIPTS}"/server-log.sh
if [ "$(cat "${BEDROCK}"/upgrade.txt)" = "upgrade" ]; then
  START_SCREENS=y "${SCRIPTS}"/server-upgrade.sh
else
  LD_LIBRARY_PATH=${BEDROCK} screen -S bedrock -dm "${BEDROCK}"/bedrock_server
  screen -S autosave -dm "${SCRIPTS}"/server-autosave.sh
fi
