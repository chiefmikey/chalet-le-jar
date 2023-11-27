#!/bin/bash

set -x
screen -S bedrock -X stuff "tickingarea remove \"${1}\"\n"
