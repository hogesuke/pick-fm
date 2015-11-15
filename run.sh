#!/usr/bin/env bash

cd `dirname $0`

bundle ex unicorn -c ./config/unicorn.rb -E production -D