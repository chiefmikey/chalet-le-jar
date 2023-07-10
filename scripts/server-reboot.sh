#!/bin/sh

# Directories
export USER="/home/chalet-le-jar"
export SCRIPTS="${USER}/scripts"

set -x
"${SCRIPTS}"/server-system.sh
reboot
