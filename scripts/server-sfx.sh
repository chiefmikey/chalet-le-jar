#!/bin/bash

set -x
source ../.bashrc
screen -S bedrock -X stuff "playsound ${1} @a\n"
