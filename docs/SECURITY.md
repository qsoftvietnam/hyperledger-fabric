# Securing the REST Server
By default, the REST server responds to requests via HTTP, with no
authentication.

HTTPS (TLS), and a number of authentication mechanisms can be
configured. A template file is pre-configured for an LDAPjs server to
aid authentication testing.

## Enabling HTTPS
By default, the server operates over HTTP. With the supplied option
`-t` or `--tls`, however, HTTPS can be enabled. To do this, you must
first generate or provide SSL keys. The server will look for these keys in the
directory `packages/fabric-rest/server/private`. The following files
are required:

- `certificate.pem`
- `privatekey.pem`

To generate these files for testing, the following command can be
issued in the `private` directory:

```bash
openssl req -x509 -newkey rsa:4096 -keyout privatekey.pem -out certificate.pem \
-days 365 -subj "/C=US/ST=Oregon/L=Portland/O=Company Name/OU=Org/CN=www.example.com" -nodes
```

Alternatively, certificate and private key file names can be specified
on the command line with the `-e` and `-k` options,
respectively. These file names should be absolute.

Now, start the server with `node . --tls` or `node . -t`. Note that if
you connect to the server with a web browser, to view the `/explorer`
interface for example, the browser may warn about using a self-signed
certificate. This is expected behaviour.

The `setup.sh` helper script has support for TLS too. Use `setup.sh
-t` option to use HTTPS when running the server, as well as running
the above commands to generate keys, if they don't already
exist. Attempting to start the server requesting HTTPS secure
transport while not having the correct certificates and private key
will cause the server to fail.


## Authentication Mechanisms
The REST server makes use of [Passport][] authentication strategies. LDAP
is the default; other strategies can be added.


### LDAP
`server/providers.json` contains the information defining the
strategies to be used by the server. The default LDAP configuration
applies to the packaged LDAP server (an [ldapjs][]
server). Alternatively, the `-s` option on the command line can be
used to specify the absolute file name of a `providers.json` file to
use. E.g.,

```bash
fabric-rest-server -s /my-providers-file.json
```

To use the packaged LDAP server for authentication, run

```bash
node ./authentication.js
```

in the `test/authentication` directory. This will start the server on
port `1389` by default, with a user `alice` whose password is
`secret`.

To configure the LDAP strategy for your own LDAP server, edit the file
`server/providers.json` in the `fabric-rest` package.

If the server runs with no authentication---that is, the default
`providers.json` is not found and none is specified on the command
line with the `-s` option---a warning will be issued on server
start. If a providers file is named with the `-s` option but this file
isn't found, an error will be given and the server process will end.


### Using Other Strategies
Many other strategies are available; to use another strategy, install
the required strategy and add this to the `providers.json` file.




[Passport]: http://passportjs.org/
[ldapjs]: http://ldapjs.org/
