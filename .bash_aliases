# Directories
export HOME="/home/chalet-le-jar"
export SCRIPTS="${HOME}/scripts"

# Server
alias start="sudo ${SCRIPTS}/server-start.sh"
alias stop="sudo ${SCRIPTS}/server-stop.sh"
alias system="sudo ${SCRIPTS}/server-system.sh"
alias refresh="sudo ${SCRIPTS}/server-refresh.sh"
alias rewind="sudo ${SCRIPTS}/server-rewind.sh"
alias upgrade="sudo ${SCRIPTS}/server-stop.sh && sudo ${SCRIPTS}/server-start.sh"
alias rboot="sudo ${SCRIPTS}/server-stop.sh && sudo ${SCRIPTS}/server-system.sh && sudo ${SCRIPTS}/server-reboot.sh"

# Screen
alias cscreen="sudo screen -ls"
alias bscreen="sudo screen -r bedrock"
alias ascreen="sudo screen -r autosave"

# System
alias mem="free -h"
alias smem="htop"
alias motd="sudo run-parts /etc/update-motd.d"

# TBD
alias rewind="sudo ${SCRIPTS}/server-cli-rewind.sh"
alias hc="sudo ${SCRIPTS}/server-health-check.sh"
alias moo="echo moo; echo 0 ${0}; echo 1 ${1}; echo ? ${?};"
