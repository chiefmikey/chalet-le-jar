#!/bin/sh

set -x
cd /home/chalet-le-jar || exit
git push origin backup/"${CURRENT_DATE}"
git checkout main
rm -r backups/backup/"${CURRENT_DATE}"
CURRENT_DATE=${CURRENT_DATE} ACTION=backup \
  /home/chalet-le-jar/scripts/server-log.sh
git push origin main:log
