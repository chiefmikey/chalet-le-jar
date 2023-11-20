#!/bin/bash

set -x
cd "${SERVER}" || exit
killall node
"${SCRIPTS}"/server-ts.sh
