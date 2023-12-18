ROOT="/home/ec2-user"

# system
alias mem="free -h"
alias system="sudo ${ROOT}/system.sh"
alias perms="sudo chmod -R +x ${ROOT}/*"

# ts server
alias client-start="sudo ${ROOT}/client.sh"
alias refresh="sudo svn export https://github.com/chiefmikey/chalet-le-jar/trunk/dns --force && sudo chmod -R +x dns && sudo ${ROOT}/dns/unpack.sh"

alias list-alias="cat ${ROOT}/.bash_aliases"

# screen
alias cscreen="sudo screen -ls"
alias ccscreen="sudo screen -r client"
