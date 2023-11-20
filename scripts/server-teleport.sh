#!/bin/bash

set -x
set_exports
screen -S bedrock -X stuff "tp ${1} ${2}"
