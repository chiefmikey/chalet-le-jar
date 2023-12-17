#!/bin/bash

set -x
screen -S bedrock -X stuff "tickingarea preload \"${1}\" true\n"
