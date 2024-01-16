import ftplib, pathlib, re, sys, fs, logging, copy, datetime
import fs.ftpfs, fs.mirror

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)
logger = logging.getLogger()


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
        _ftp.set_debuglevel(0)
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
    print(f"{sys.argv[0]} push|pull")
    sys.exit()


def remote_fs():
    return MyFTPFS("***REMOVED***",
                   user="***REMOVED***",
                   passwd="***REMOVED***",
                   port=***REMOVED***,
                   tls=True)


def local_fs():
    return fs.open_fs('osfs://')


if __name__ == '__main__':
    mode = ""
    try:
        mode = sys.argv[1]
    except IndexError:
        usage()
    if mode == "pull":
        pathlib.Path("html").mkdir(exist_ok=True, parents=True)
        fs.mirror.mirror(remote_fs().opendir('html'),
                         local_fs().opendir("html"),
                         walker=None,
                         copy_if_newer=True,
                         workers=4,
                         preserve_time=False)

        pass
    elif mode == "push":
        fs.mirror.mirror(local_fs().opendir("html"),
                         remote_fs().opendir('html'),
                         walker=None,
                         copy_if_newer=True,
                         workers=4,
                         preserve_time=False)
    else:
        usage()
