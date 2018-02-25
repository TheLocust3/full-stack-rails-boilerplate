#!/bin/bash

set -e

# this script sets up codedeploy. It must be run on the server before codedeploy actually can deploy

# install codedeploy
sudo apt-get update
sudo apt-get install ruby wget
wget https://aws-codedeploy-us-east-1.s3.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent restart
