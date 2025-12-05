#!/bin/bash

if test -f ~/workspace/python-venv/bin/activate; then
	source ~/workspace/python-venv/bin/activate
elif  test -f $(dirname $0)/.venv/bin/activate; then
	source $(dirname $0)/.venv/bin/activate
fi

if [ -n "$TERM" -a "$TERM" == "dumb" ]; then
    pushd() {
	command pushd "$@" >/dev/null
    }
    popd() {
	command popd "$@" >/dev/null
    }
fi

pushd $(dirname $0);
{	
    echo "Begin $(date)"
    time_before=$(date +%s)
    . .env
    python ./sync.py $1; 
    time_after=$(date +%s)
    echo "$(($time_after - $time_before))s"
    echo
} >> run.log

popd
