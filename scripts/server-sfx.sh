#!/bin/sh

set -x
screen -S bedrock -X stuff "playsound ${1} @a\n"
