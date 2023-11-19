#!/bin/sh

set -x
cd /home/chalet-le-jar/server || exit
killall node
/home/chalet-le-jar/scripts/server-ts.sh
