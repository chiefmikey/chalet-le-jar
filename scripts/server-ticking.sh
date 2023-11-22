#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
screen -S bedrock -X stuff "tickingarea add circle ${1} ${2} ${3}\n"
