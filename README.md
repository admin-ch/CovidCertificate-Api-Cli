swiss-admin-covid-certificate-api-cli
=====================================



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/swiss-admin-covid-certificate-api-cli.svg)](https://npmjs.org/package/swiss-admin-covid-certificate-api-cli)
[![CircleCI](https://circleci.com/gh/admin-ch/CovidCertificate-Api-Cli/tree/master.svg?style=shield)](https://circleci.com/gh/admin-ch/CovidCertificate-Api-Cli/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/swiss-admin-covid-certificate-api-cli.svg)](https://npmjs.org/package/swiss-admin-covid-certificate-api-cli)
[![License](https://img.shields.io/npm/l/swiss-admin-covid-certificate-api-cli.svg)](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g swiss-admin-covid-certificate-api-cli
$ cc-cli COMMAND
running command...
$ cc-cli (-v|--version|version)
swiss-admin-covid-certificate-api-cli/0.0.0 darwin-x64 node-v14.17.0
$ cc-cli --help [COMMAND]
USAGE
  $ cc-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cc-cli hello [FILE]`](#cc-cli-hello-file)
* [`cc-cli help [COMMAND]`](#cc-cli-help-command)
* [`cc-cli sign [FILE]`](#cc-cli-sign-file)

## `cc-cli hello [FILE]`

describe the command here

```
USAGE
  $ cc-cli hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ cc-cli hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v0.0.0/src/commands/hello.ts)_

## `cc-cli help [COMMAND]`

display help for cc-cli

```
USAGE
  $ cc-cli help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `cc-cli sign [FILE]`

describe the command here

```
USAGE
  $ cc-cli sign [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/sign.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v0.0.0/src/commands/sign.ts)_
<!-- commandsstop -->
