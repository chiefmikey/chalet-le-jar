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

# initialize an array to keep track of the currently active users
declare -a ACTIVE_USERS=()

# function to update the users.log file
update_users_log() {
  printf "%s\n" "${ACTIVE_USERS[@]}" > "${ROOT}/users.log"
}

# monitor bedrock screenlog for player spawn and disconnect events
(
  tail -F "$SCREENLOG" | while read -r line; do
    if [[ $line == *"Player connected:"* ]]; then
      # extract the username and add it to the array
      username=${line#*"Player connected: "}
      ACTIVE_USERS+=("$username")
      echo "Player connected: $username"
      update_users_log
    elif [[ $line == *"Player disconnected:"* ]]; then
      # extract the username and remove it from the array
      username=${line#*"Player disconnected: "}
      ACTIVE_USERS=("${ACTIVE_USERS[@]/$username}")
      echo "Player disconnected: $username"
      update_users_log
    fi
  done
) &
