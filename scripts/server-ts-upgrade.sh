#!/bin/bash

set -x
set_exports
cd "${SERVER}" || exit
killall node
"${SCRIPTS}"/server-ts.sh
