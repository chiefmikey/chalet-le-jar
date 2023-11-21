#!/bin/bash

set -x
ROOT="/home/ec2-user"
cd "${ROOT}"/client || exit
npm i
npm run build:prod
npm run start:prod
