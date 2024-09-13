#!/bin/bash
python=/home/justin/workspace/pyenv/versions/3.12.1/bin/python
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
	$python ./sync.py pull_ics; 
	$python ./sync.py push_ics;
	time_after=$(date +%s)
	echo "$(($time_after - $time_before))s"
	echo
} >> run.log
popd
