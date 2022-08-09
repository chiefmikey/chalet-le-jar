#!/bin/sh

set -x
cd /home/chalet-le-jar
export CURRENT_DATE=$(TZ=":US/Mountain" date +%y-%m-%d_%H-%M-%S)
cp -r worlds/clj backups/backup/${CURRENT_DATE}
git add "backups/backup/${CURRENT_DATE}"
git stash push
git checkout -b "backup/${CURRENT_DATE}"
git stash pop
git commit -am "backup/${CURRENT_DATE}"
CURRENT_DATE=${CURRENT_DATE} screen -S push -dm /home/chalet-le-jar/scripts/server-push.sh
