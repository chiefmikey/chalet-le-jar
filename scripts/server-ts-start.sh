#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${ROOT}"/server || exit
npm i
npm run start:prod
