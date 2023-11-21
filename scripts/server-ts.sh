#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}" || exit
screen -S server -X quit

if ! command -v curl > /dev/null 2>&1; then
  apt install -y curl
fi
if ! command -v svn > /dev/null 2>&1; then
  apt install -y subversion
fi
if ! command -v node > /dev/null 2>&1; then
  apt update
  apt install -y ca-certificates curl gnupg
  mkdir -p /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  NODE_MAJOR=21
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
  apt update
  apt install nodejs -y
fi
if ! command -v npm > /dev/null 2>&1; then
  apt install -y npm
fi

cd "${ROOT}"/api || exit
svn export https://github.com/chiefmikey/chalet-le-jar/trunk/server --force

screen -S server -dm "${SCRIPTS}"/server-ts-start.sh
