#!/bin/bash

set -x
screen -L -S bedrock -X stuff "say ${1}\n"
