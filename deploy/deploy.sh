#!/bin/bash

set -e

NAME=test
BUCKET=test-$NAME
DEPLOYMENT_GROUP=production

tar -czvf deploy.tar.gz *

aws s3 mb s3://$BUCKET
aws s3 rm s3://$BUCKET/deploy.tar.gz
aws s3 cp deploy.tar.gz s3://$BUCKET/

rm deploy.tar.gz

aws deploy create-deployment --application-name $NAME --deployment-group-name $DEPLOYMENT_GROUP --ignore-application-stop-failures --s3-location bundleType=tgz,bucket=$BUCKET,key=deploy.tar.gz --file-exists-behavior=OVERWRITE
