#!/bin/bash

set -x
source /home/chalet-le-jar/.bashrc
cd "${SERVER}" || exit
killall node
"${SCRIPTS}"/server-ts.sh
