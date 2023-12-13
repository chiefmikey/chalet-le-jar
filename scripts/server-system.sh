#!/bin/bash

set -x
apt-get update -y &&
apt-get upgrade -y &&
apt-get full-upgrade -y &&
apt-get autoremove -y &&
apt-get clean -y &&
apt-get install -f &&
do-release-upgrade
