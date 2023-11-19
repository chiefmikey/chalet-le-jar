USER="/home/chalet-le-jar"
SCRIPTS="${USER}/scripts"

# server
alias start="sudo ${SCRIPTS}/server-start.sh"
alias stop="sudo ${SCRIPTS}/server-stop.sh"
alias save="sudo ${SCRIPTS}/server-save.sh"
alias sfx="sudo ${SCRIPTS}/server-sfx.sh"
alias message="sudo ${SCRIPTS}/server-message.sh"
alias system="sudo ${SCRIPTS}/server-system.sh"
alias refresh="sudo ${SCRIPTS}/server-refresh.sh"
alias rewind="sudo ${SCRIPTS}/server-rewind.sh"
alias upgrade="sudo ${SCRIPTS}/server-stop.sh && sudo ${SCRIPTS}/server-start.sh"
alias rboot="sudo ${SCRIPTS}/server-stop.sh && sudo ${SCRIPTS}/server-reboot.sh"
alias rb="sudo ${SCRIPTS}/server-reboot.sh"

# screen
alias cscreen="sudo screen -ls"
alias bscreen="sudo screen -r bedrock"
alias ascreen="sudo screen -r autosave"

# system
alias mem="free -h"
alias smem="htop"
alias motd="sudo run-parts /etc/update-motd.d"

# ts server
alias ts-init="sudo ${SCRIPTS}/server-ts.sh"
alias ts-upgrade="sudo ${SCRIPTS}/server-ts-upgrade.sh"

# TBD
alias rewindcli="sudo ${SCRIPTS}/server-cli-rewind.sh"
alias hc="sudo ${SCRIPTS}/server-health-check.sh"
alias moo="echo moo; echo 0 ${0}; echo 1 ${1}; echo ? ${?};"

alias list-alias="cat ${USER}/.bash_aliases"
