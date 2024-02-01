#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# File:     /home/justin/workspace/bsvadw.de/sync.py
# Author:   Justin Salisbury justin@sinube
# Created:  Thu Jan 18 12:13:57 2024
#

import ftplib, sys, fs, datetime
import fs.ftpfs, fs.mirror
import fs.walk
import fs.permissions
import urllib.request
import pathlib

##
import logging

DEBUG=False

if DEBUG:
    logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
logger = logging.getLogger()


class FTP_TLS_BSVADW(ftplib.FTP_TLS):
    def __init__(self):
        super().__init__()
        if DEBUG:
            self.set_debuglevel(1)
        self.connect("***REMOVED***", port=***REMOVED***)
        self.login(user="***REMOVED***", passwd="***REMOVED***")
        self.prot_p()
        self.cwd('html')

    def ntransfercmd(self, cmd, rest=None):
        conn, size = ftplib.FTP.ntransfercmd(self, cmd, rest)
        if self._prot_p:
            conn = self.context.wrap_socket(conn,
                                            server_hostname=self.host,
                                            session=self.sock.session)  # this is the fix
        return conn, size


def usage():
    print("Usage:")
    print(f"{sys.argv[0]} push|pull|archive|ics")
    sys.exit()


def archive_home():
    local_fs = fs.open_fs('osfs://')
    local_fs.makedir('arch', recreate=True)
    if local_fs.exists("home"):
        local_fs.movedir('home', f'arch/{datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")}', create=True)


if __name__ == '__main__':
    mode = ""
    try:
        mode = sys.argv[1]
    except IndexError:
        usage()
    if mode == "push":
        homePath = pathlib.Path("home/html")
        remoteConnection = FTP_TLS_BSVADW()
        for homeFilePath in homePath.rglob('*'):
            relativePath = homeFilePath.relative_to("home/html")
            if homeFilePath.is_dir():
                try:
                    remoteConnection.mkd('./' + str(relativePath))
                except ftplib.error_perm:
                    logger.debug("Directory already exists %s", relativePath)
            else:
                with homeFilePath.open("rb") as fh:
                    remoteConnection.storbinary(f"STOR {relativePath}", fh)
                    remoteConnection.sendcmd(f"SITE CHMOD 644 {relativePath}")
                    logger.debug("File Uploaded %s", relativePath)
    elif mode == "archive":
        archive_home()
    elif mode == "pull_ics":
        bsvadw = {
            "bettv": "https://bettv.tischtennislive.de/export/Tischtennis/iCal.aspx?Typ=Verein&ID=***REMOVED***&Runde=2&Hallenplan=True",
            "google": "https://calendar.google.com/calendar/ical/***REMOVED***%40group.calendar.google.com/private-***REMOVED***/basic.ics"
        }
        for filename, url in bsvadw.items():
            with (open(f"site/public/{filename}.ics", "wb") as f1,
                  open(f"home/html/{filename}.ics", "wb") as f2):
                contents = urllib.request.urlopen(url).read()
                f1.write(contents)
                f2.write(contents)
                pass
            pass
        pass
    elif mode == 'push_ics':
        homePath = pathlib.Path("home/html")
        remoteConnection = FTP_TLS_BSVADW()
        for basename in ['google.ics', "bettv.ics"]:
            filePath = homePath / basename
            with filePath.open("rb") as file:
                remoteConnection.storbinary(f"STOR {basename}", file)
            remoteConnection.sendcmd(f"SITE CHMOD 644 {basename}")
        remoteConnection.quit()
    else:
        usage()
