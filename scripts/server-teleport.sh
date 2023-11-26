#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
screen -S bedrock -X stuff "tickingarea add circle ${2} 1 \"${1}\"\n"
sleep 1
screen -S bedrock -X stuff "tp \"${1}\" ${2} true\n"
sleep 5
screen -S bedrock -X stuff "tickingarea remove \"${1}\"\n"
