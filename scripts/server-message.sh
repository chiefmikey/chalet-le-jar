#!/bin/bash

set -x
source ~/.bashrc
screen -S bedrock -X stuff "${1}\n"
