#!/bin/bash
#Script to run in debian as a service

nvm use 18
rm -rf nohup.out
nohup npm start > nohup.out 2>&1 &

