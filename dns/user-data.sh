Content-Type: multipart/mixed; boundary="//"
MIME-Version: 1.0

--//
Content-Type: text/cloud-config; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="cloud-config.txt"

#cloud-config
cloud_final_modules:
- [scripts-user, always]

--//
Content-Type: text/x-shellscript; charset="us-ascii"
MIME-Version: 1.0
Content-Transfer-Encoding: 7bit
Content-Disposition: attachment; filename="userdata.txt"

#!/bin/sh
cd /home/ec2-user
INSTANCE_ALREADY_STARTED="INSTANCE_ALREADY_STARTED_PLACEHOLDER"
if [ ! -e /home/ec2-user/$INSTANCE_ALREADY_STARTED ]; then
touch /home/ec2-user/$INSTANCE_ALREADY_STARTED
  echo "-- First instance startup --"
    yum update -y
    yum install -y wget unzip git
    rm -rf /usr/local/go
    wget -O /home/ec2-user/go.tar.gz https://golang.org/dl/go1.17.2.linux-amd64.tar.gz
    tar -C /usr/local -xzf /home/ec2-user/go.tar.gz
    rm /home/ec2-user/go.tar.gz
    echo "export PATH=$PATH:/usr/local/go/bin" >> /home/ec2-user/.profile
    source /home/ec2-user/.profile
    git clone https://github.com/coredns/coredns
    cd /home/ec2-user/coredns
    make
    echo \
      ".:53 {
        rewrite name exact mco.lbsg.net ip.chaletlejar.com
        forward . 1.1.1.1:53
      }" \
    >> /home/ec2-user/coredns/Corefile
    chmod +x /home/ec2-user/coredns/coredns
    sudo su -s /bin/bash -c 'screen -S coredns -dm sudo /home/ec2-user/coredns/coredns' root
else
  cd /home/ec2-user
  echo "-- Not first instance startup --"
    sudo yum update -y
    sudo su -s /bin/bash -c 'screen -S coredns -dm sudo /home/ec2-user/coredns/coredns' root
fi
--//--