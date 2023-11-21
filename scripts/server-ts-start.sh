#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${SERVER}" || exit
npm i
npm run start:prod
