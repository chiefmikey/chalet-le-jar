#!/bin/sh

set -x
cd "${ROOT}" || exit
git push origin backup/"${CURRENT_DATE}"
git checkout main
rm -r "${BACKUPS}"/backup/"${CURRENT_DATE}"
CURRENT_DATE=${CURRENT_DATE} ACTION=backup \
  "${SCRIPTS}"/server-log.sh
git push origin main:log
