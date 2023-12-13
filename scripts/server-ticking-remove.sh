#!/bin/bash

set -x
screen -L -S bedrock -X stuff "tickingarea remove \"${1}\"\n"
