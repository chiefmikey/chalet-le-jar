#!/bin/bash

set -x

screen -L -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 1

screen -L -S bedrock -X stuff "say stopping in 10...9...8...7...6...5...4...3...2...1...\n"
sleep 1

screen -L -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 1\n"
sleep .2
screen -L -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .8

screen -L -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 1\n"
sleep .2
screen -L -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .8


screen -L -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 1\n"
sleep .2
screen -L -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .8


screen -L -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 1\n"
sleep .2
screen -L -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .8


screen -L -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 1\n"
sleep .2
screen -L -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .8


screen -L -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 1\n"
sleep .2
screen -L -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .8


screen -L -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 1\n"
sleep .2
screen -L -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .8


screen -L -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 1\n"
sleep .2
screen -L -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .8


screen -L -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 1\n"
sleep .2
screen -L -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .8


screen -L -S bedrock -X stuff "playsound beacon.deactivate @a\n"
sleep 1
