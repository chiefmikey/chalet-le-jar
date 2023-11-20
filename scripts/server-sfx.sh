#!/bin/bash

set -x
source /home/chalet-le-jar/.bashrc
screen -S bedrock -X stuff "playsound ${1} @a\n"
