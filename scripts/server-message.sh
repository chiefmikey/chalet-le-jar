#!/bin/bash

set -x
screen -S bedrock -X stuff "${1}\n"
