#!/bin/bash

set -e

cd /home/ubuntu

sudo apt-get update

# install updated version of ruby build
sudo apt-get install -y rbenv ruby-build autoconf bison
mkdir -p ~/.rbenv/plugins
cd ~/.rbenv/plugins
rm -rf ruby-build/
git clone https://github.com/sstephenson/ruby-build.git # update ruby-build definitions

# install npm and updated version of nodejs
sudo apt-get install -y npm libpq-dev

sudo npm install --global n
sudo n 8.6.0
sudo ln -sf /usr/local/n/versions/node/8.6.0/bin/node /usr/bin/nodejs

# setup nginx + passenger
sudo apt-get install -y nginx

# setup certbot
sudo apt-get install -y software-properties-common
sudo add-apt-repository -y ppa:certbot/certbot
sudo apt-get update
sudo apt-get install -y python-certbot-nginx
