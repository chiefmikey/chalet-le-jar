#!/bin/bash

set -x
source /home/chalet-le-jar/.bashrc
screen -S bedrock -X stuff "tp ${1} ${2}"
