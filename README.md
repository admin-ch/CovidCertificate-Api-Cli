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
swiss-admin-covid-certificate-api-cli/0.1.3 darwin-x64 node-v14.17.0
$ cc-cli --help [COMMAND]
USAGE
  $ cc-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cc-cli create-recovery`](#cc-cli-create-recovery)
* [`cc-cli help [COMMAND]`](#cc-cli-help-command)
* [`cc-cli sign FILE`](#cc-cli-sign-file)

## `cc-cli create-recovery`

create a recovery certificate

```
USAGE
  $ cc-cli create-recovery

OPTIONS
  --baseUrl=baseUrl                                              (required) the url of the REST API
  --certificateFile=certificateFile                              (required) path to PEM encoded certificate

  --countryOfTest=countryOfTest                                  (required) the country in which the covid certificate
                                                                 owner has been tested. Format: string (2 chars
                                                                 according to ISO 3166 Country Codes).

  --dateOfBirth=dateOfBirth                                      (required) birthdate of the covid certificate owner.
                                                                 Format: ISO 8601 date without time. Range: can be
                                                                 between 1900-01-01 and 2099-12-31

  --dateOfFirstPositiveTestResult=dateOfFirstPositiveTestResult  (required) date when the sample for the test was
                                                                 collected. Format: ISO 8601 date without time. Range:
                                                                 can be between 1900-01-01 and 2099-12-31

  --familyName=familyName                                        (required) family name of the covid certificate owner

  --givenName=givenName                                          (required) given name of the covid certificate owner

  --keyFile=keyFile                                              (required) path to PEM encoded private key

  --language=language                                            [default: de] Accepted languages are: de, it, fr, rm

  --local                                                        adds additional headers required to mock the WSG

  --otp=otp                                                      (required) the otp secret

  --outDir=outDir                                                (required) [default:
                                                                 /var/folders/hv/73dvbzz14ms96bgl5xlyxgww0000gn/T]
                                                                 output directory
```

_See code: [src/commands/create-recovery.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v0.1.3/src/commands/create-recovery.ts)_

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

## `cc-cli sign FILE`

reads a utf8 encoded text file, signs the text and writes the base64 encoded signature to stdout

```
USAGE
  $ cc-cli sign FILE

ARGUMENTS
  FILE  input file, should be JSON

OPTIONS
  -h, --help         show CLI help
  --keyFile=keyFile  (required) path to PEM encoded private key
```

_See code: [src/commands/sign.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v0.1.3/src/commands/sign.ts)_
<!-- commandsstop -->
