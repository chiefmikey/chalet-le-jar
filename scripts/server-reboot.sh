#!/bin/sh

USER="/home/chalet-le-jar"
SCRIPTS="${USER}/scripts"

set -x
"${SCRIPTS}"/server-system.sh
reboot
