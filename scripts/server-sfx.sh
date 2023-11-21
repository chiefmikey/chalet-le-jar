#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
screen -S bedrock -X stuff "playsound ${1} @a\n"
