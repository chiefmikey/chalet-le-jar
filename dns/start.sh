#!/bin/bash

cd "${ROOT}"/client || exit
npm i
npm run build:prod
npm run start:prod
