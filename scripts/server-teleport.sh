#!/bin/sh

set -x
screen -S bedrock -X stuff "tp ${1} ${2}"
