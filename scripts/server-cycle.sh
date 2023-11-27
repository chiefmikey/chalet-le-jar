#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
"${SCRIPTS}"/server-stop.sh && "${SCRIPTS}"/server-start.sh
