#!/bin/bash

cd /home/ubuntu
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
cp -r worlds/clj backups/backup/$currentDate
git add "backups/backup/$currentDate"
git stash push
git checkout -b "backup/$currentDate"
git stash pop
git commit -am "backup/$currentDate"
currentDate=$currentDate su -s /bin/bash -p -c 'screen -S push -dm /home/ubuntu/scripts/server-push.sh' root
