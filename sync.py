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
# import logging
# logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
# logger = logging.getLogger()


class FTP_TLS(ftplib.FTP_TLS):
    def ntransfercmd(self, cmd, rest=None):
        conn, size = ftplib.FTP.ntransfercmd(self, cmd, rest)
        if self._prot_p:
            conn = self.context.wrap_socket(conn,
                                            server_hostname=self.host,
                                            session=self.sock.session)  # this is the fix
        return conn, size


class MyFTPFS(fs.ftpfs.FTPFS):
    def _open_ftp(self):
        _ftp = FTP_TLS()
        _ftp.set_debuglevel(1)
        with fs.ftpfs.ftp_errors(self):
            _ftp.connect(self.host, self.port, self.timeout)
            _ftp.login(self.user, self.passwd, self.acct)
            try:
                _ftp.prot_p()  # type: ignore
            except AttributeError:
                pass
            self._features = {}
            try:
                feat_response = fs.ftpfs._decode(_ftp.sendcmd("FEAT"), "latin-1")
            except fs.ftpfs.error_perm:  # pragma: no cover
                self.encoding = "latin-1"
            else:
                self._features = self._parse_features(feat_response)
                self.encoding = "utf-8" if "UTF8" in self._features else "latin-1"
                if not fs.ftpfs.PY2:
                    _ftp.file = _ftp.sock.makefile("r", encoding=self.encoding)
                    pass
                pass
            pass
        _ftp.encoding = self.encoding
        self._welcome = _ftp.welcome
        return _ftp


def usage():
    print("Usage:")
    print(f"{sys.argv[0]} push|pull|archive|ics")
    sys.exit()


def get_remote_fs():
    return MyFTPFS("***REMOVED***",
                   user="***REMOVED***",
                   passwd="***REMOVED***",
                   port=***REMOVED***,
                   tls=True)


def get_remote_connection():
    _ftp = FTP_TLS()
    _ftp.set_debuglevel(1)
    _ftp.connect("***REMOVED***", port=***REMOVED***)
    _ftp.login(user="***REMOVED***", passwd="***REMOVED***")
    _ftp.prot_p()
    _ftp.cwd('html')
    return _ftp


def get_local_fs():
    return fs.open_fs('osfs://')


def archive_home():
    local_fs = get_local_fs()
    local_fs.makedir('arch', recreate=True)
    if local_fs.exists("home"):
        local_fs.movedir('home', f'arch/{datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S")}', create=True)


if __name__ == '__main__':
    mode = ""
    try:
        mode = sys.argv[1]
    except IndexError:
        usage()
    if mode == "pull":
        archive_home()
        local_fs = get_local_fs()
        local_fs.makedirs('home/html', recreate=True)
        fs.mirror.mirror(get_remote_fs().opendir('html'),
                         local_fs.opendir("home/html"),
                         walker=None,
                         copy_if_newer=True,
                         workers=4)

        pass
    elif mode == "push":
        fs.mirror.mirror(get_local_fs().opendir("home/html"),
                         get_remote_fs().opendir('html'),
                         walker=None,
                         copy_if_newer=True,
                         workers=4)
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
        remoteConnection = get_remote_connection()
        for basename in ['google.ics', "bettv.ics"]:
            filePath = pathlib.Path("home/html") / basename
            with filePath.open("rb") as file:
                remoteConnection.storbinary(f"STOR {basename}", file)
            remoteConnection.sendcmd(f"SITE CHMOD 644 {basename}")
        remoteConnection.quit()
    else:
        usage()
