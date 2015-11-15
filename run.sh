#!/usr/bin/env bash

cd `dirname $0`
cd app/

bundle ex unicorn -c ../config/unicorn.rb -E production -D