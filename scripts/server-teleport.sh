#!/bin/bash

set -x
source ~/.bashrc
screen -S bedrock -X stuff "tp ${1} ${2}"
