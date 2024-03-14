#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# File:     /home/justin/workspace/bsvadw.de/sync.py
# Author:   Justin Salisbury justin@sinube
# Created:  Thu Jan 18 12:13:57 2024
#
import ftplib, sys, datetime, pathlib, urllib.request, logging, os, urllib.parse

DEBUG = False

if DEBUG:
    logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
else:
    logging.basicConfig(stream=sys.stdout, level=logging.INFO)

logger = logging.getLogger()


class FTP_TLS_BSVADW(ftplib.FTP_TLS):
    def __init__(self):
        super().__init__()
        if DEBUG:
            self.set_debuglevel(1)
            pass
        url = os.getenv("FTP_TLS_BSVADW_URL")
        if not url:
            usage("Environment FTP_TLS_BSVADW_URL must be set")
        parsed_url = urllib.parse.urlparse(url)
        logger.info("HOSTNAME %s PORT %s USERNAME %s PASSWORD --------",
                    parsed_url.hostname, parsed_url.port, parsed_url.username)
        self.connect(parsed_url.hostname, port=parsed_url.port)
        self.login(user=parsed_url.username, passwd=parsed_url.password)
        self.prot_p()
        self.cwd('html')

    def ntransfercmd(self, cmd, rest=None):
        conn, size = ftplib.FTP.ntransfercmd(self, cmd, rest)
        if self._prot_p:
            conn = self.context.wrap_socket(conn,
                                            server_hostname=self.host,
                                            session=self.sock.session)  # this is the fix
        return conn, size

    pass


def usage(*args):
    print("Usage:")
    print(f"{sys.argv[0]} push|push_ics|pull_ics")
    print(*args)
    sys.exit()


def push():
    homePath = pathlib.Path("home/html")
    with FTP_TLS_BSVADW() as remoteConnection:
        for homeFilePath in homePath.rglob('*'):
            relativePath = homeFilePath.relative_to("home/html")
            if homeFilePath.is_dir():
                try:
                    remoteConnection.mkd('./' + str(relativePath))
                except ftplib.error_perm:
                    logger.debug("Directory already exists %s", relativePath)
                    pass
                remoteConnection.sendcmd(f"SITE CHMOD 755 {relativePath}")
            else:
                with homeFilePath.open("rb") as fh:
                    remoteConnection.storbinary(f"STOR {relativePath}", fh)
                    remoteConnection.sendcmd(f"SITE CHMOD 644 {relativePath}")
                    logger.debug("File Uploaded %s", relativePath)
                    pass
                pass
            pass
        pass
    pass


def pull_ics():
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


def push_ics():
    homePath = pathlib.Path("home/html")
    with FTP_TLS_BSVADW() as remoteConnection:
        for basename in ['google.ics', "bettv.ics"]:
            filePath = homePath / basename
            with filePath.open("rb") as file:
                remoteConnection.storbinary(f"STOR {basename}", file)
                remoteConnection.sendcmd(f"SITE CHMOD 644 {basename}")
                pass
            pass
        pass
    pass


if __name__ == '__main__':

    try:
        globals().get(sys.argv[1], usage)()
    except Exception as e:
        usage()
