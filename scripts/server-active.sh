#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x

SCREENLOG="${ROOT}/bedrock.log"
USERS_LOG="${ROOT}/users.log"
AUTOSAVE_LOG="${ROOT}/autosave.log"

# create log files if they don't exist
touch "${SCREENLOG}"
touch "${USERS_LOG}"
touch "${AUTOSAVE_LOG}"

AUTOSAVE_PID=""
USER_COUNT=0
AUTOSAVE_STARTED=false

# initialize an array to keep track of the currently active users
declare -a ACTIVE_USERS=()

# function to update the users.log file
update_users_log() {
  printf "%s\n" "${ACTIVE_USERS[@]}" > "${USERS_LOG}"

  # if there is at least one active user, start the autosave
  if [ ${#ACTIVE_USERS[@]} -ge 1 ]; then
    start_autosave
  # if there are no active users, stop the autosave
  elif [ ${#ACTIVE_USERS[@]} -eq 0 ]; then
    stop_autosave
  fi
}

# monitor bedrock screenlog for player spawn and disconnect events
(
  tail -F "$SCREENLOG" | while read -r line; do
    if [[ $line == *"Player connected:"* ]]; then
      # extract the username and add it to the array
      username=${line#*"Player connected: "}
      username=${username%%,*}  # new line to remove everything after the comma
      ACTIVE_USERS+=("$username")
      echo "Player connected: $username"
      update_users_log
    elif [[ $line == *"Player disconnected:"* ]]; then
      # extract the username and remove it from the array
      username=${line#*"Player disconnected: "}
      username=${username%%,*}  # new line to remove everything after the comma
      ACTIVE_USERS=( "${ACTIVE_USERS[@]/$username}" ) # remove the user
      ACTIVE_USERS=( "${ACTIVE_USERS[@]}" ) # re-index the array
      echo "Player disconnected: $username"
      update_users_log
    fi
  done
) &
