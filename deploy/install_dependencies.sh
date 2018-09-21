#!/bin/bash

RUBY_VERSION=2.5.0 # Need to also update service file with different ruby version

set -e

source /home/ubuntu/rails/deploy/install_root_dependencies.sh

sudo chmod 777 -R /home/ubuntu/rails
cd /home/ubuntu/rails

# setup services
ls deploy/services | xargs -i sudo install -m u+rw,ugo-x,go-w,go+r deploy/services/"{}" "/lib/systemd/system/{}"
sudo systemctl daemon-reload
sudo systemctl enable rails.service

# correct ruby version
sudo rbenv install -s $RUBY_VERSION
sudo chmod 777 -R /home/ubuntu/.rbenv/versions/$RUBY_VERSION
export PATH=/home/ubuntu/.rbenv/versions/$RUBY_VERSION/bin:$PATH

sudo npm install --global yarn
gem install bundler

sudo rm /etc/nginx/sites-available/default
sudo cp /home/ubuntu/rails/deploy/nginx /etc/nginx/sites-available/default
sudo systemctl restart nginx

# setup server
cd /home/ubuntu/rails

# pull secrets
export $(cat /home/ubuntu/secrets.env | xargs)

bundle install
