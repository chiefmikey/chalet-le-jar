#!/bin/bash

set -x
screen -S bedrock -X stuff "tickingarea add circle 142 90 169 4 KELP\n"
screen -S bedrock -X stuff "tickingarea add circle 0 0 0 4 GUARDIAN\n"
screen -S bedrock -X stuff "tickingarea add circle 1290 188 -10 4 CREEPER\n"
screen -S bedrock -X stuff "tickingarea add circle 27 64 167 4 CASTLE\n"
screen -S bedrock -X stuff "tickingarea preload KELP true\n"
screen -S bedrock -X stuff "tickingarea preload GUARDIAN true\n"
screen -S bedrock -X stuff "tickingarea preload CREEPER true\n"
screen -S bedrock -X stuff "tickingarea preload CASTLE true\n"
