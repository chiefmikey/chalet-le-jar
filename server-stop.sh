#!/bin/sh

screen -S bedrock -X stuff 'save hold\n'
date = echo $(date +%y:%m:%d:%H:%M:%S)
git add ~/worlds && git commit -am echo $date
screen -S bedrock -X stuff 'save resume\n'