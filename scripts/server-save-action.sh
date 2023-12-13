#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x

cd "${ROOT}" || exit
screen -L -S bedrock -X stuff "save hold\n"

while true; do
  screen -L -S bedrock -X stuff "save query\n"
  FILE_LIST=$(awk '/Data saved. Files are now ready to be copied./{flag=1;next}flag' screenlog.0)
  if [[ $FILE_LIST != "" ]]; then
    rm screenlog.0
    FILE_LIST=$(echo "$FILE_LIST" | sed 's/, /\n/g' | awk '{if(/\r$/) {print; exit} else print}' | tr -d '\r')
    break
  fi
  sleep 5
done

IFS=$'\n'
counter=0
for line in $FILE_LIST; do
  if [[ ! $line =~ ^clj ]]; then
    echo "$line"
    break
  fi
  file=$(echo "$line" | cut -d':' -f1)
  length=$(echo "$line" | cut -d':' -f2)
  directory=$(dirname "${BACKUPS}/${1}/${2}/$file")
  mkdir -p "$directory"
  dd if="${ROOT}/worlds/$file" bs=4096 count="$length" | mbuffer -m 1G -q -o "${BACKUPS}/${1}/${2}/$file" &
  counter=$((counter+1))
  if (( counter % 20 == 0 )); then
    wait
  fi
done

wait

screen -L -S bedrock -X stuff "save resume\n"
