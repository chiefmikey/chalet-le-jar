#!/bin/bash

set -x
source /home/chalet-le-jar/.bash_aliases
screen -S bedrock -X stuff "${1}\n"
