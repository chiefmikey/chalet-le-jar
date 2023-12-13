#!/bin/bash

set -x
screen -L -S bedrock -X stuff "tickingarea add circle 142 90 169 4 KELP\n"
screen -L -S bedrock -X stuff "tickingarea add circle 0 0 0 4 GUARDIAN\n"
screen -L -S bedrock -X stuff "tickingarea add circle 1290 188 -10 4 CREEPER\n"
screen -L -S bedrock -X stuff "tickingarea add circle 27 64 167 4 CASTLE\n"
screen -L -S bedrock -X stuff "tickingarea preload KELP true\n"
screen -L -S bedrock -X stuff "tickingarea preload GUARDIAN true\n"
screen -L -S bedrock -X stuff "tickingarea preload CREEPER true\n"
screen -L -S bedrock -X stuff "tickingarea preload CASTLE true\n"
