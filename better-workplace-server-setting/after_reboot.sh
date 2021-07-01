#!/usr/bin/env bash

#restart haveged
/etc/init.d/haveged start

#restart mongo 
sudo systemctl start mongod 
sudo systemctl enable mongod

#restart nginx 
sudo nginx -t
sudo systemctl restart nginx
