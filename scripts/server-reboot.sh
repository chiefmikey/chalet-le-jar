#!/bin/bash

set -x
source ~/.bashrc
"${SCRIPTS}"/server-system.sh
reboot
