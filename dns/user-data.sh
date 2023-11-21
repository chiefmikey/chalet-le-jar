#!/bin/bash

set -x
ROOT="/home/ec2-user"
cd ${ROOT} || exit
yum update -y && yum upgrade -y
yum install -y wget
wget -O ${ROOT}/coredns.tar.gz https://github.com/coredns/coredns/releases/download/v1.11.1/coredns_1.11.1_linux_amd64.tgz
mkdir ${ROOT}/coredns
tar -C ${ROOT}/coredns -xzf ${ROOT}/coredns.tar.gz
cd ${ROOT}/coredns || exit
echo \
  ".:53 {
    bufsize 1232
    log
    errors
    health {
      lameduck 20s
    }
    rewrite name exact mco.lbsg.net ip.chaletlejar.com
    rewrite name exact geo.hivebedrock.network ip.chaletlejar.com
    rewrite name exact hivebedrock.network ip.chaletlejar.com
    rewrite name exact mco.mineplex.com ip.chaletlejar.com
    rewrite name exact mco.cubecraft.net ip.chaletlejar.com
    rewrite name exact play.inpvp.net ip.chaletlejar.com
    rewrite name exact play.galaxite.net ip.chaletlejar.com
    rewrite name exact play.pixelparadise.gg ip.chaletlejar.com
    forward . 8.8.8.8:53
  }" \
>> ${ROOT}/coredns/Corefile
chmod +x ${ROOT}/coredns/coredns
screen -S coredns -dm ${ROOT}/coredns/coredns

if ! command -v svn > /dev/null 2>&1; then
  yum install -y subversion
fi
svn export https://github.com/chiefmikey/chalet-le-jar/trunk/dns --force
chmod -R +x ${ROOT}/dns
${ROOT}/dns/unpack.sh
${ROOT}/client.sh
