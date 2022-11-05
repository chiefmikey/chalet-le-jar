#!/bin/sh

set -x
cd /home/ec2-user
yum update -y && yum upgrade -y
yum install -y wget unzip git
rm -rf /usr/local/go
wget -O /home/ec2-user/go.tar.gz https://go.dev/dl/go1.19.3.linux-amd64.tar.gz
tar -C /usr/local -xzf /home/ec2-user/go.tar.gz
rm /home/ec2-user/go.tar.gz
echo "export PATH=$PATH:/usr/local/go/bin" >> /etc/profile
source /etc/profile
git clone https://github.com/coredns/coredns
chown -R ec2-user:root /home/ec2-user/coredns
cd /home/ec2-user/coredns
su -s /bin/sh -c 'make' ec2-user
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
>> /home/ec2-user/coredns/Corefile
chmod +x /home/ec2-user/coredns/coredns
screen -S coredns -dm /home/ec2-user/coredns/coredns
