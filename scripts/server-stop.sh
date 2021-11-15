#!/bin/sh

cd /home/ubuntu
screen -S watch -X quit
screen -S bedrock -X stuff "save hold\n"
sleep 10
currentDate=$(TZ=":US/Mountain" date +%y-%m-%d-%H-%M-%S)
zip -r worlds/data.zip worlds/level.dat worlds/level.dat_old worlds/levelname.txt
git add log worlds
git restore --staged worlds/level.dat worlds/level.dat_old worlds/levelname.txt
git stash push
git checkout -b $currentDate-shutdown
git stash pop
echo "Shutdown: $currentDate" >> log/shutdown-log.txt
git commit -am $currentDate-shutdown
git push origin $currentDate-shutdown
screen -S bedrock -X stuff "save resume\n"
screen -S bedrock -X stuff "stop\n"
rm worlds/data.zip
