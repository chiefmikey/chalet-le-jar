#!/bin/bash

set -x
source ../.bashrc
cd "${SERVER}" || exit
killall node
"${SCRIPTS}"/server-ts.sh
