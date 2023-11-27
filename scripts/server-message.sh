#!/bin/bash

set -x
screen -S bedrock -X stuff "say ${1}\n"
