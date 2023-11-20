#!/bin/bash

set -x
set_exports
"${SCRIPTS}"/server-system.sh
reboot
