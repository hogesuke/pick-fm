#!/usr/bin/env bash

cd `dirname $0`

curl -XDELETE 'http://localhost:9200/pickfm'
curl -XPOST localhost:9200/pickfm -d @mapping.json

bundle ex ruby data_importer.rb rebuildfm
bundle ex ruby data_importer.rb wadafm
