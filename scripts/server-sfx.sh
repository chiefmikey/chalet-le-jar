#!/bin/bash

set -x
source /home/chalet-le-jar/.bash_aliases
screen -S bedrock -X stuff "playsound ${1} @a\n"
