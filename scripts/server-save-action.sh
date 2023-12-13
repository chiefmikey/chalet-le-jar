#!/bin/bash

source /home/chalet-le-jar/.bash_aliases
set -x

cd "${ROOT}" || exit
screen -S bedrock -X stuff "save hold\n"

while true; do
  FILE_LIST=$(screen -S bedrock -X stuff "save query\n" | awk '/Data saved. Files are now ready to be copied./{flag=1;next}flag')
  if [[ $FILE_LIST != "" ]]; then
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

screen -S bedrock -X stuff "save resume\n"
