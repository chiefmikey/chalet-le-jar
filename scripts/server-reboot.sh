#!/bin/sh

SCRIPTS="${HOME}/scripts"

set -x
"${SCRIPTS}"/server-system.sh
reboot
