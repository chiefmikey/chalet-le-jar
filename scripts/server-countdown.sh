#!/bin/bash

set -x
screen -S autosave -X quit

screen -S bedrock -X stuff "playsound beacon.activate @a\n"
sleep 1

screen -S bedrock -X stuff "say stopping in 10...9...8...7...6...5...4...3...2...1...\n"
sleep 1

screen -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 0.5\n"
sleep .5
screen -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .5

screen -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 0.5\n"
sleep .5
screen -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .5


screen -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 0.5\n"
sleep .5
screen -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .5


screen -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 0.5\n"
sleep .5
screen -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .5


screen -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 0.5\n"
sleep .5
screen -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .5


screen -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 0.5\n"
sleep .5
screen -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .5


screen -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 0.5\n"
sleep .5
screen -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .5


screen -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 0.5\n"
sleep .5
screen -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .5


screen -S bedrock -X stuff "playsound mob.cat.straymeow @a ^ ^ ^ 1 0.5\n"
sleep .5
screen -S bedrock -X stuff "stopsound @a mob.cat.straymeow\n"
sleep .5


screen -S bedrock -X stuff "playsound beacon.deactivate @a\n"
sleep 1

screen -S bedrock -X stuff "stop\n"

sleep 10

screen -S autosave -X quit
screen -S bedrock -X quit
