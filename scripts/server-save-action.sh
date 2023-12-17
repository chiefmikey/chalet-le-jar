#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x

cd "${ROOT}" || exit
screen -S bedrock -X stuff "save hold\n"

while true; do
  screen -S bedrock -X stuff "save query\n"
  FILE_LIST=$(awk '/Data saved. Files are now ready to be copied./{flag=1;next}flag' "${ROOT}"/bedrock.log)
  if [[ $FILE_LIST != "" ]]; then
    FILE_LIST=$(echo "$FILE_LIST" | sed 's/, /\n/g' | awk '{if(/\r$/) {print; exit} else print}' | tr -d '\r')
    break
  fi
  sleep 2
done

IFS=$'\n'
counter=0
for line in $FILE_LIST; do
  if [[ ! $line =~ ^clj ]]; then
    echo "$line"
    break
  fi
  file=$(echo "$line" | awk -F':' '{print $1}')
  length=$(echo "$line" | awk -F':' '{print $NF}')
  directory=$(dirname "${BACKUPS}/${1}/${2}/$file")
  mkdir -p "$directory"
  dd if="${ROOT}/worlds/$file" bs=10M count="$length" | mbuffer -m 1G -q -o "${BACKUPS}/${1}/${2}/$file" &
  counter=$((counter+1))
  # if (( counter % 20 == 0 )); then
  #   wait
  # fi
done

wait
screen -S bedrock -X stuff "save resume\n"
mv -f "${ROOT}"/bedrock.log "${ROOT}"/bedrock.log.bak
