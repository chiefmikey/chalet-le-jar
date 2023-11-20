#!/bin/bash

set -x
ROOT="/home/ec2-user"
cd "${ROOT}" || exit
yum update -y
yum upgrade -y

if ! command -v curl > /dev/null 2>&1; then
  yum install -y curl
fi
if ! command -v svn > /dev/null 2>&1; then
  yum install -y subversion
fi
if ! command -v node > /dev/null 2>&1 || ! command -v npm > /dev/null 2>&1; then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
  . "${ROOT}"/.nvm/nvm.sh
  nvm install node
fi

svn export https://github.com/chiefmikey/chalet-le-jar/trunk/client --force

cd "${ROOT}"/client || exit
npm i
npm run build:prod
npm run start:prod
