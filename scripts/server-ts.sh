#!/bin/bash

set -x
cd "${ROOT}" || exit
apt update -y
apt upgrade -y

if ! command -v curl > /dev/null 2>&1; then
  apt install -y curl
fi
if ! command -v svn > /dev/null 2>&1; then
  apt install -y subversion
fi
if ! command -v node > /dev/null 2>&1 || ! command -v npm > /dev/null 2>&1; then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
  . "${ROOT}"/.nvm/nvm.sh
  nvm install node
fi

svn export https://github.com/chiefmikey/chalet-le-jar/trunk/server --force

cd "${SERVER}" || exit
npm i
npm run start:prod
