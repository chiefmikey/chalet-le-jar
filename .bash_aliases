export ROOT="/home/chalet-le-jar"
export SCRIPTS="${ROOT}/scripts"
export SERVER="${ROOT}/server"
export LOG="${ROOT}/log"
export BACKUPS="${ROOT}/backups"

# server
alias perms="sudo chown -R chalet-le-jar:root ${ROOT} && sudo chmod -R +x ${SCRIPTS}"
alias start="sudo ${SCRIPTS}/server-start.sh"
alias stop="sudo ${SCRIPTS}/server-stop.sh"
alias save="sudo ${SCRIPTS}/server-save.sh"
alias sfx="sudo ${SCRIPTS}/server-sfx.sh"
alias message="sudo ${SCRIPTS}/server-message.sh"
alias teleport="sudo ${SCRIPTS}/server-teleport.sh"
alias system="sudo ${SCRIPTS}/server-system.sh"
alias refresh="sudo ${SCRIPTS}/server-refresh.sh"
alias rewind="sudo ${SCRIPTS}/server-rewind.sh"
alias upgrade="sudo ${SCRIPTS}/server-cycle.sh"
alias rboot="sudo ${SCRIPTS}/server-stop.sh && sudo ${SCRIPTS}/server-reboot.sh"
alias rb="sudo ${SCRIPTS}/server-reboot.sh"
alias content="sudo rm -R Content*"

# screen
alias cscreen="sudo screen -ls"
alias bscreen="sudo screen -r bedrock"
alias ascreen="sudo screen -r autosave"
alias sscreen="sudo screen -r server"

# git
alias fetch="sudo git fetch --prune && sudo git checkout main"
alias reset="sudo git reset --hard origin/main"

# system
alias mem="free -h"
alias smem="htop"
alias motd="sudo run-parts /etc/update-motd.d"

# ts server
alias server-start="sudo ${SCRIPTS}/server-ts.sh"

# TBD
alias rewindcli="sudo ${SCRIPTS}/server-cli-rewind.sh"
alias hc="sudo ${SCRIPTS}/server-health-check.sh"
alias moo="echo moo; echo 0 ${0}; echo 1 ${1}; echo ? ${?};"

alias list-alias="cat ${ROOT}/.bash_aliases"
