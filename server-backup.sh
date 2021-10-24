#!/bin/sh

screen -S bedrock -X stuff 'save hold\n'
currentDate=$(date +%y:%m:%d:%H:%M:%S)
git add . && git commit -am $currentDate && git push origin main
screen -S bedrock -X stuff 'save resume\n'