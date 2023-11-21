#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}"/api/server || exit
npm i
npm run start:prod
