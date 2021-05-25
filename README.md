swiss-admin-covid-certificate-api-cli
=====================================



[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/swiss-admin-covid-certificate-api-cli.svg)](https://npmjs.org/package/swiss-admin-covid-certificate-api-cli)
[![Downloads/week](https://img.shields.io/npm/dw/swiss-admin-covid-certificate-api-cli.svg)](https://npmjs.org/package/swiss-admin-covid-certificate-api-cli)
[![License](https://img.shields.io/npm/l/swiss-admin-covid-certificate-api-cli.svg)](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/master/package.json)

<!-- toc -->
* [About](#about)
* [Usage](#usage)
* [Commands](#commands)
* [Debugging](#debugging)
<!-- tocstop -->

# About
`cc-cli` interacts with the [Swiss Covid Certificate API](https://github.com/admin-ch/CovidCertificate-Apidoc#readme).
It was created for testing and demo purposes only. 

# Usage
<!-- usage -->
```sh-session
$ npm install -g swiss-admin-covid-certificate-api-cli
$ cc-cli COMMAND
running command...
$ cc-cli (-v|--version|version)
swiss-admin-covid-certificate-api-cli/1.0.0 darwin-x64 node-v14.17.0
$ cc-cli --help [COMMAND]
USAGE
  $ cc-cli COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`cc-cli create-recovery`](#cc-cli-create-recovery)
* [`cc-cli create-test`](#cc-cli-create-test)
* [`cc-cli create-vaccination`](#cc-cli-create-vaccination)
* [`cc-cli help [COMMAND]`](#cc-cli-help-command)
* [`cc-cli pm-update FILE`](#cc-cli-pm-update-file)
* [`cc-cli sign FILE`](#cc-cli-sign-file)

## `cc-cli create-recovery`

create a recovery certificate

```
USAGE
  $ cc-cli create-recovery

OPTIONS
  -d, --debug                                                    enable debug output.
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

_See code: [src/commands/create-recovery.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v1.0.0/src/commands/create-recovery.ts)_

## `cc-cli create-test`

create a test certificate

```
USAGE
  $ cc-cli create-test

OPTIONS
  -d, --debug                                        enable debug output.
  --baseUrl=baseUrl                                  (required) the url of the REST API
  --certificateFile=certificateFile                  (required) path to PEM encoded certificate

  --dateOfBirth=dateOfBirth                          (required) birthdate of the covid certificate owner. Format: ISO
                                                     8601 date without time. Range: can be between 1900-01-01 and
                                                     2099-12-31

  --familyName=familyName                            (required) family name of the covid certificate owner

  --givenName=givenName                              (required) given name of the covid certificate owner

  --keyFile=keyFile                                  (required) path to PEM encoded private key

  --language=language                                [default: de] Accepted languages are: de, it, fr, rm

  --local                                            adds additional headers required to mock the WSG

  --manufacturerCode=manufacturerCode                test manufacturer code. This should only be sent when it is not a
                                                     PCR test

  --memberStateOfTest=memberStateOfTest              (required) the country in which the covid certificate owner has
                                                     been tested. Format: string (2 chars according to ISO 3166 Country
                                                     Codes).

  --otp=otp                                          (required) the otp secret

  --outDir=outDir                                    (required) [default:
                                                     /var/folders/hv/73dvbzz14ms96bgl5xlyxgww0000gn/T] output directory

  --resultDateTime=resultDateTime                    ate and time of the test result production (optional for rapid
                                                     antigen test). Format: ISO 8601 date incl. time.

  --sampleDateTime=sampleDateTime                    (required) date and time of the test sample collection. Format: ISO
                                                     8601 date incl. time.

  --testingCentreOrFacility=testingCentreOrFacility  (required) name of centre or facility.

  --typeCode=typeCode                                type of test. This field is only mandatory when it is a PCR test.
```

_See code: [src/commands/create-test.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v1.0.0/src/commands/create-test.ts)_

## `cc-cli create-vaccination`

create a vaccination certificate

```
USAGE
  $ cc-cli create-vaccination

OPTIONS
  -d, --debug                                  enable debug output.
  --baseUrl=baseUrl                            (required) the url of the REST API
  --certificateFile=certificateFile            (required) path to PEM encoded certificate

  --countryOfVaccination=countryOfVaccination  (required) the country in which the covid certificate owner has been
                                               tested. Format: string (2 chars according to ISO 3166 Country Codes).

  --dateOfBirth=dateOfBirth                    (required) birthdate of the covid certificate owner. Format: ISO 8601
                                               date without time. Range: can be between 1900-01-01 and 2099-12-31

  --familyName=familyName                      (required) family name of the covid certificate owner

  --givenName=givenName                        (required) given name of the covid certificate owner

  --keyFile=keyFile                            (required) path to PEM encoded private key

  --language=language                          [default: de] Accepted languages are: de, it, fr, rm

  --local                                      adds additional headers required to mock the WSG

  --medicinalProductCode=medicinalProductCode  (required) name of the medicinal product as registered in the country.

  --numberOfDoses=numberOfDoses                (required) number in a series of doses

  --otp=otp                                    (required) the otp secret

  --outDir=outDir                              (required) [default: /var/folders/hv/73dvbzz14ms96bgl5xlyxgww0000gn/T]
                                               output directory

  --totalNumberOfDoses=totalNumberOfDoses      (required) number in a series of doses

  --vaccinationDate=vaccinationDate            (required) date when the sample for the test was collected. Format: ISO
                                               8601 date without time. Range: can be between 1900-01-01 and 2099-12-31
```

_See code: [src/commands/create-vaccination.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v1.0.0/src/commands/create-vaccination.ts)_

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

## `cc-cli pm-update FILE`

updates otp values and signatures in a Postman collection

```
USAGE
  $ cc-cli pm-update FILE

ARGUMENTS
  FILE  path to Postman collection

OPTIONS
  -h, --help         show CLI help
  --keyFile=keyFile  (required) path to PEM encoded private key
  --otp=otp          (required) the otp secret
```

_See code: [src/commands/pm-update.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v1.0.0/src/commands/pm-update.ts)_

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

_See code: [src/commands/sign.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v1.0.0/src/commands/sign.ts)_
<!-- commandsstop -->

# Debugging
cc-cli uses [`debug`](https://www.npmjs.com/package/debug).
