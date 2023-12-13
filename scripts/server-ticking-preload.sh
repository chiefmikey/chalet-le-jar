#!/bin/bash

set -x
screen -L -S bedrock -X stuff "tickingarea preload \"${1}\" true\n"
