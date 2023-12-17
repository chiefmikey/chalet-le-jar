#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x

# path to the autosave script
AUTOSAVE_SCRIPT="${SCRIPTS}/server-autosave.sh"

# path to bedrock screenlog
SCREENLOG="${ROOT}/bedrock.log"

# initialize a variable to keep track of the autosave process ID
AUTOSAVE_PID=""

# initialize a counter to keep track of the number of logged-in users
USER_COUNT=0

# function to start the autosave script
start_autosave() {
  screen -L -Logfile "${ROOT}"/autosave.log -S autosave -dm bash "${AUTOSAVE_SCRIPT}"
  echo "Started autosave"
}

# function to stop the autosave script
stop_autosave() {
  screen -S autosave -X quit
  echo "Stopped autosave"
}

# monitor bedrock screenlog for player spawn events
(
  tail -F "$SCREENLOG" | while read -r line; do
    if [[ $line == *"Player Spawned"* ]]; then
      echo "Player spawned"
      ((USER_COUNT++))
      if [[ $USER_COUNT -eq 1 ]]; then
        start_autosave
      fi
    elif [[ $line == *"Player disconnected"* ]]; then
      echo "Player disconnected"
      ((USER_COUNT--))
      if [[ $USER_COUNT -eq 0 ]]; then
        stop_autosave
      fi
    fi
  done
)
