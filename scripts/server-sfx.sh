#!/bin/bash

set -x
screen -L -S bedrock -X stuff "playsound ${1} @a\n"
