#!/bin/bash

set -x
source /home/chalet-le-jar/.bash_aliases
cd "${SERVER}" || exit
killall node
"${SCRIPTS}"/server-ts.sh
