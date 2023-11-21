#!/bin/bash

set -x
source /home/chalet-le-jar/.bash_aliases
"${SCRIPTS}"/server-system.sh
reboot
