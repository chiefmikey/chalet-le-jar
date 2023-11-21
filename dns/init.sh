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
if ! command -v node > /dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
  apt install -y nodejs
fi
if ! command -v npm > /dev/null 2>&1; then
  apt install -y npm
fi

svn export https://github.com/chiefmikey/chalet-le-jar/trunk/client --force

screen -S server -dm ${ROOT}/start.sh
