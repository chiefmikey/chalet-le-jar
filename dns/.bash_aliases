USER="/home/ec2-user"

# system
alias mem="free -h"
alias smem="htop"
alias motd="sudo run-parts /etc/update-motd.d"

# ts server
alias ts-init="sudo ${USER}/init.sh"
alias ts-upgrade="sudo ${USER}/upgrade.sh"

alias list-alias="cat ${USER}/.bash_aliases"
