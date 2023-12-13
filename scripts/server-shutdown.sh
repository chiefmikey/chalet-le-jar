#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
"${SCRIPTS}"/server-system.sh
shutdown -h now
