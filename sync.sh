#!/bin/bash

pushd $(dirname $0)
. python-venv/bin/activate
python3 ./sync.py $@
popd
