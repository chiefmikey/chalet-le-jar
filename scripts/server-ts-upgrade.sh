#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x
cd "${SERVER}" || exit
killall node
"${SCRIPTS}"/server-ts.sh
