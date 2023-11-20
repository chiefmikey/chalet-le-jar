#!/bin/bash

set -x
set_exports
screen -S bedrock -X stuff "playsound ${1} @a\n"
