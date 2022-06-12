#!/bin/sh
##
#  @author:       Justin Salisbury
#  @description:  MIRROR DISTANT FOLDER TO LOCAL FOLDER VIA FTP (push and pull)
#
# FTP LOGIN
##
# Old ip
# HOST='ftp://62.75.165.169'
##
# New IP
# HOST='ftp://bsvadw.de'
HOST="***REMOVED***"
USER='***REMOVED***'
PASSWORD='***REMOVED***'
PORT=***REMOVED***
# DISTANT DIRECTORY
REMOTE_DIR='html/'
# LOCAL DIRECTORY
LOCAL_DIR='home/html/'
LFTP="lftp -p "$PORT" -u "$USER","$PASSWORD" $HOST"
LFTP_MIRROR_ARGS="--delete -x access.log"
##
# RUNTIME!
echo
date
##
#
ARCHIVE_DIR=archive/$(date "+%Y-%m-%dT%H:%M:%S")

test -d $LOCAL_DIR || mkdir -p $LOCAL_DIR
case $1 in
    test)
	echo $LFTP
;;
    push)
	echo "Starting upload from $LOCAL_DIR to $REMOTE_DIR on $HOST"
	$LFTP <<EOF
mirror -R $LFTP_MIRROR_ARGS $LOCAL_DIR $REMOTE_DIR;
exit
EOF
	echo
	echo "Transfer finished"
	date
	;;
    pull)

	
	echo "Starting download $REMOTE_DIR from $HOST to $LOCAL_DIR"    
	$LFTP <<EOF
mirror $LFTP_MIRROR_ARGS $REMOTE_DIR $LOCAL_DIR;
exit   
EOF
	echo
	echo "Transfer finished"
	date
	;;
    archive)
	test -d $ARCHIVE_DIR || mkdir -p $ARCHIVE_DIR
	rsync -avh $LOCAL_DIR $ARCHIVE_DIR
	;;
    *)
	echo Usage:
	echo "$0 push|pull"
	;;
esac


