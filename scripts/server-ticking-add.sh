#!/bin/bash

set -x
screen -S bedrock -X stuff "tickingarea add circle ${1} ${2} \"${3}\"\n"
