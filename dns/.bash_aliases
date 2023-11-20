ROOT="/home/ec2-user"

# system
alias mem="free -h"
alias smem="htop"
alias motd="sudo run-parts /etc/update-motd.d"

# ts server
alias ts-init="sudo ${ROOT}/init.sh"
alias ts-upgrade="sudo ${ROOT}/upgrade.sh"

alias list-alias="cat ${ROOT}/.bash_aliases"
