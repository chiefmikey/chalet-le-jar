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
  yum install https://rpm.nodesource.com/pub_21.x/nodistro/repo/nodesource-release-nodistro-1.noarch.rpm -y
  yum install nodejs -y --setopt=nodesource-nodejs.module_hotfixes=1
fi
if ! command -v npm > /dev/null 2>&1; then
  yum install -y npm
fi

svn export https://github.com/chiefmikey/chalet-le-jar/trunk/client --force

screen -S client -dm ${ROOT}/client-start.sh
