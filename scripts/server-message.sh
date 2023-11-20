#!/bin/bash

set -x
set_exports
screen -S bedrock -X stuff "${1}\n"
