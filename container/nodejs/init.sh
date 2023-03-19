#!/bin/bash

#$1 user id
#$2 group id
#$3 nodejs version

echo "adding group app" &&\
    groupadd -g "$2" app &&\
\
echo "adding user app and adding him to group app" &&\
    useradd -u "$1" -m app -g app &&\
\
    apt-get update &&\
\
echo "installing common dependencies\n" &&\
    apt-get install curl nano git software-properties-common -y &&\
\
echo "adding nvm.sh to .bashrc to run nvm every login. It will set up nodejs version" &&\
    echo "source /home/app/.nvm/nvm.sh" >> ~/.bashrc &&\
\
echo "Setting up HOME dir for app user. All remaining commands are running under that user" &&\
    export HOME=/home/app &&\
\
echo "downloading and installing nvm" &&\
    su -c "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash" -m app &&\
\
echo "installing node, npm, quasar"
    su -c "\
        echo \"making nvm command available\" &&\
            export NVM_DIR=\"\$HOME/.nvm\" &&\
            [ -s \"\$NVM_DIR/nvm.sh\" ] &&\
            \. \"\$NVM_DIR/nvm.sh\" &&\
        \
        echo \"installing node\" &&\
            nvm install $3 &&\
        \
        echo \"setting up nodejs version\" &&\
            nvm use $3 &&\
        \
        echo \"installing quasar\" &&\
            npm install -g @quasar/cli\
    " -m app &&\
\
echo 'adding nvm.sh to .bashrc to run it every login. It set up nodejs version' &&\
    echo "source /home/app/.nvm/nvm.sh" >> /home/app/.bashrc &&\
\
echo "Don't forget to set HOME dir back" &&\
    export HOME=/root
