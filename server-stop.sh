#!/bin/sh

screen -S bedrock -X stuff 'save hold\n'
date = echo $(date)
git add ~/worlds && git commit -am $date
screen -S bedrock -X stuff 'save resume\n'