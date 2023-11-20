#!/bin/bash

set -x
source /home/chalet-le-jar/.bashrc
"${SCRIPTS}"/server-system.sh
reboot
