#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x

# path to the autosave script
AUTOSAVE_SCRIPT="${SCRIPTS}/server-autosave.sh"

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

start_autosave() {
  if ! screen -list | grep -q "autosave" && ! $AUTOSAVE_STARTED; then
    screen -L -Logfile "${AUTOSAVE_LOG}" -S autosave -dm bash "${AUTOSAVE_SCRIPT}"
    echo "Started autosave"
    AUTOSAVE_STARTED=true
  fi
}

# function to stop the autosave script
stop_autosave() {
  # check if the autosave process is running before trying to stop it
  if screen -list | grep -q "autosave"; then
    screen -S autosave -X quit
    echo "Stopped autosave"
    AUTOSAVE_STARTED=false
  fi
}

# initialize an array to keep track of the currently active users
declare -a ACTIVE_USERS=()

# function to update the users.log file
update_users_log() {
  printf "%s\n" "${ACTIVE_USERS[@]}" > "${USERS_LOG}"
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

      # start the autosave process if it's the first user
      if [ ${#ACTIVE_USERS[@]} -eq 1 ]; then
        start_autosave
      fi
    elif [[ $line == *"Player disconnected:"* ]]; then
      # extract the username and remove it from the array
      username=${line#*"Player disconnected: "}
      username=${username%%,*}  # new line to remove everything after the comma
      ACTIVE_USERS=( "${ACTIVE_USERS[@]/$username}" ) # remove the user
      ACTIVE_USERS=( "${ACTIVE_USERS[@]}" ) # re-index the array
      echo "Player disconnected: $username"
      update_users_log

      # stop the autosave process if it's the last user
      if [ ${#ACTIVE_USERS[@]} -eq 0 ]; then
        stop_autosave
      fi
    fi
  done
) &
