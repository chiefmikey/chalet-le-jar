#!/bin/bash

set -x
ROOT="/home/ec2-user"
cd "${ROOT}" || exit

shopt -s dotglob
mv -f "${ROOT}"/dns/* "${ROOT}"/
