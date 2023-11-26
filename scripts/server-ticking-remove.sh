#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
screen -S bedrock -X stuff "tickingarea remove \"${1}\"\n"
