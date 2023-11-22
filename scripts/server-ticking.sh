#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
screen -S bedrock -X stuff "tickingarea remove_all\n"
screen -S bedrock -X stuff "tickingarea add circle 142 90 169 4 KELP\n"
screen -S bedrock -X stuff "tickingarea add circle 0 0 0 4 GUARDIAN\n"
screen -S bedrock -X stuff "tickingarea add circle 1290 188 -10 4 CREEPER\n"
screen -S bedrock -X stuff "tickingarea preload KELP true\n"
screen -S bedrock -X stuff "tickingarea preload GUARDIAN true\n"
screen -S bedrock -X stuff "tickingarea preload CREEPER true\n"
