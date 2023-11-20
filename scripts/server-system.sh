#!/bin/bash

set -x
source ~/.bashrc
apt update -y &&
apt upgrade -y &&
apt full-upgrade -y &&
apt autoremove -y &&
apt clean -y &&
apt install -f &&
do-release-upgrade
