#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# File:     /home/justin/workspace/bsvadw.de/sync.py
# Author:   Justin Salisbury justin@sinube
# Created:  Thu Jan 18 12:13:57 2024
#
import ftplib, sys, pathlib, urllib.request, logging, os, urllib.parse
from os.path import basename

DEBUG = False

if DEBUG:
    logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
else:
    logging.basicConfig(stream=sys.stdout, level=logging.INFO)

logger = logging.getLogger()
##
#
KNOWN_CALENDARS = ["HEIMSPIELE_HALLE1", "TERMINE_HALLE2", "TERMINE_HALLE1", 'TERMINE_JUGEND']


def check_env():
    wanted_keys = ["FTPS_URL"] + KNOWN_CALENDARS
    for key in wanted_keys:
        if not os.getenv(key):
            wanted_keys_string = " ".join([f'{wanted_key}=""' for wanted_key in wanted_keys])
            raise EnvironmentError(f"Environment variable not set: {key}, like this: \nexport {wanted_keys_string};")


def usage(*args):
    print()
    print(*args)
    print()
    print("Usage:")
    print(f"{sys.argv[0]} push|push_ics|pull_ics")
    sys.exit()


class FTP_TLS_BSVADW(ftplib.FTP_TLS):
    def __init__(self):
        super().__init__()
        if DEBUG:
            self.set_debuglevel(1)
            pass
        url = os.getenv("FTPS_URL")
        if not url:
            usage("Environment FTPS_URL must be set")
        parsed_url = urllib.parse.urlparse(url)
        logger.debug("HOSTNAME %s PORT %s USERNAME %s PASSWORD --------",
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


def get_filename(name):
    return f"{name.replace('_', '-').lower()}.ics"


def pull_ics():
    ##
    # copy to both locations for development
    targetDirs = [pathlib.Path("site/public"), pathlib.Path("home/public")]
    # and get them all
    for name in KNOWN_CALENDARS:
        url = os.getenv(name)
        contents = urllib.request.urlopen(url).read()
        for targetDir in targetDirs:
            targetDir.mkdir(parents=True, exist_ok=True)
            filePath = targetDir / get_filename(name)
            try:
                with filePath.open("wb") as file:
                    file.write(contents)
                    pass
            except Exception as e:
                logger.warning("Could not write file %s", e)
                pass
            pass
        pass
    pass


def push_ics():
    with FTP_TLS_BSVADW() as remoteConnection:
        for name in KNOWN_CALENDARS:
            filePath = pathlib.Path("site/public") / get_filename(name)
            with filePath.open("rb") as file:
                remoteConnection.storbinary(f"STOR {filePath.name}", file)
                remoteConnection.sendcmd(f"SITE CHMOD 644 {filePath.name}")
                pass
            pass
        pass
    pass


if __name__ == '__main__':
    try:
        check_env()
        globals().get(sys.argv[1], usage)()
    except IndexError:
        usage("Missing Argument")
    except TypeError:
        usage("Wrong Argument")
