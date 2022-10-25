#!/bin/sh

set -x
apt update -y &&
apt upgrade -y &&
apt full-upgrade -y &&
apt autoremove -y &&
apt autoclean -y
