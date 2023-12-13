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
    break
  fi
  sleep 5
done

IFS=$'\n'
for line in $FILE_LIST; do
  file=$(echo "$line" | cut -d' ' -f1)
  length=$(echo "$line" | cut -d' ' -f2)
  dd if="${ROOT}/worlds/$file" of="${BACKUPS}/${1}/${2}/$file" bs=1 count="$length"
done

screen -L -S bedrock -X stuff "save resume\n"
