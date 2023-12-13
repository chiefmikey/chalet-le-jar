#!/bin/bash

set -x
screen -L -S bedrock -X stuff "tickingarea add circle ${1} ${2} \"${3}\"\n"
