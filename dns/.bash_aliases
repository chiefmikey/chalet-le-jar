ROOT="/home/ec2-user"

# system
alias mem="free -h"

# ts server
alias client-start="sudo ${ROOT}/init.sh"
alias refresh="sudo svn export https://github.com/chiefmikey/chalet-le-jar/trunk/dns --force && sudo chmod -R +x dns && sudo ${ROOT}/dns/unpack.sh"

alias list-alias="cat ${ROOT}/.bash_aliases"
