#!/bin/bash

set -x
ROOT="/home/ec2-user"
cd "${ROOT}" || exit

mv "${ROOT}"/dns/* "${ROOT}"/
