#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x

AUTOSAVE_SCRIPT="${SCRIPTS}/server-autosave.sh"
SCREENLOG="${ROOT}/bedrock.log"
USERS_LOG="${ROOT}/users.log"
AUTOSAVE_LOG="${ROOT}/autosave.log"
AUTOSAVE_PID=""
USER_COUNT=0
AUTOSAVE_STARTED=false

touch "${SCREENLOG}"
touch "${USERS_LOG}"
touch "${AUTOSAVE_LOG}"

true > "${ROOT}/users.log"

start_autosave() {
  if ! screen -list | grep -q "autosave" && ! $AUTOSAVE_STARTED; then
    screen -L -Logfile "${AUTOSAVE_LOG}" -S autosave -dm bash "${AUTOSAVE_SCRIPT}"
    echo "Started autosave"
    AUTOSAVE_STARTED=true
  fi
}

stop_autosave() {
  if screen -list | grep -q "autosave"; then
    screen -S autosave -X quit
    echo "Stopped autosave"
    AUTOSAVE_STARTED=false
  fi
}

# initialize an array to keep track of the currently active users
declare -a ACTIVE_USERS=()

update_users_log() {
  printf "%s\n" "${ACTIVE_USERS[@]}" > "${USERS_LOG}"
}

is_user_active() {
  local username=$1
  for user in "${ACTIVE_USERS[@]}"; do
    if [[ $user == "${username}" ]]; then
      return 0
    fi
  done
  return 1
}

(
  tail -F "$SCREENLOG" | while read -r line; do
    if [[ $line == *"Player connected:"* ]]; then
      # extract the username
      username=${line#*"Player connected: "}
      username=${username%%,*}  # new line to remove everything after the comma

      # add the username to the array if it's not already there
      if ! is_user_active "$username"; then
        ACTIVE_USERS+=("$username")
        echo "Player connected: $username"
        update_users_log

        # start the autosave process if it's the first user
        if [ ${#ACTIVE_USERS[@]} -eq 1 ]; then
          start_autosave
        fi
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
