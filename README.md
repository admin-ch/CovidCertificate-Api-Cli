# CLI to use the Swiss Covid Certificate API

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/swiss-admin-covid-certificate-api-cli.svg)](https://npmjs.org/package/swiss-admin-covid-certificate-api-cli)
[![Downloads/week](https://img.shields.io/npm/dw/swiss-admin-covid-certificate-api-cli.svg)](https://npmjs.org/package/swiss-admin-covid-certificate-api-cli)
[![License](https://img.shields.io/npm/l/swiss-admin-covid-certificate-api-cli.svg)](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/master/package.json)

<!-- toc -->
* [CLI to use the Swiss Covid Certificate API](#cli-to-use-the-swiss-covid-certificate-api)
* [About](#about)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# About
`cc-cli` interacts with the [Swiss Covid Certificate API](https://github.com/admin-ch/CovidCertificate-Apidoc#readme).
It was created for testing and demo purposes only. 

## OpenAPI Model Generation
The model where created from the [API specification](https://github.com/admin-ch/CovidCertificate-Apidoc/blob/main/api-doc.json) using [openapi-typescript-codegen](https://www.npmjs.com/package/openapi-typescript-codegen).

They can be regenerated with `npm run generate-api`. The implementation is in [generate-api.js](generate-api.js) and the API Spec located at [api-doc.json](api-doc.json).

## Debugging
cc-cli uses [`debug`](https://www.npmjs.com/package/debug).

Enable API interaction tracing with `DEBUG=cc-cli:api` or use the `--debug` flag.

# Usage
<!-- usage -->
```sh-session
$ npm install -g swiss-admin-covid-certificate-api-cli
$ cc-cli COMMAND
running command...
$ cc-cli (-v|--version|version)
swiss-admin-covid-certificate-api-cli/1.4.0 darwin-x64 node-v14.17.0
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
  -d, --debug                                            enable debug output.
  --baseUrl=https://ws.covidcertificate-a.bag.admin.ch/  (required) the url of the REST API
  --certificateFile=~/a0000-cc-cli-TEST.cer              (required) path to PEM encoded certificate

  --countryOfTest=CH                                     (required) the country in which the covid certificate owner has
                                                         been tested. Format: string (2 chars according to ISO 3166
                                                         Country Codes).

  --dateOfBirth=1964-03-14                               (required) birthdate of the covid certificate owner. Format:
                                                         ISO 8601 date without time.

  --dateOfFirstPositiveTestResult=2020-01-01             (required) date when the sample for the test was collected.
                                                         Format: ISO 8601 date without time.

  --familyName=Rochat                                    (required) family name of the covid certificate owner

  --givenName=Céline                                     (required) given name of the covid certificate owner

  --keyFile=~/a0000-cc-cli-TEST.encrypted.key            (required) path to PEM encoded private key

  --keyPassphrase=abcdefghijklmnopqrstuvwxyz             passphrase to decrypt the private key

  --language=fr                                          [default: de] Accepted languages are: de, it, fr, rm

  --local                                                adds additional headers required to mock the WSG

  --otp=a.b.c                                            (required) the otp secret

  --outDir=out                                           (required) [default:
                                                         /var/folders/hv/73dvbzz14ms96bgl5xlyxgww0000gn/T] output
                                                         directory

EXAMPLE

       export CC_CLI_OTP="a.b.c"
       export CC_CLI_KEY_PASSPHRASE="secret"
       export CC_CLI_BASE_URL="https://ws.covidcertificate-a.bag.admin.ch/"
       export CC_CLI_CERTIFICATE_FILE="ZH-spital-A-t.bit.admin.ch.cer"
       export CC_CLI_KEY_FILE="ZH-spital-A-t.bit.admin.ch.encrypted.key"
       export CC_CLI_OUT_DIR="out"
       cc-cli create-recovery \
         --language="it" \
         --familyName="Rossi" \
         --givenName="Giulia" \
         --dateOfBirth="1964-03-14" \
         --dateOfFirstPositiveTestResult="2020-01-01" \
         --countryOfTest="CH"
```

_See code: [src/commands/create-recovery.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v1.4.0/src/commands/create-recovery.ts)_

## `cc-cli create-test`

create a test certificate

```
USAGE
  $ cc-cli create-test

OPTIONS
  -d, --debug                                            enable debug output.
  --baseUrl=https://ws.covidcertificate-a.bag.admin.ch/  (required) the url of the REST API
  --certificateFile=~/a0000-cc-cli-TEST.cer              (required) path to PEM encoded certificate

  --dateOfBirth=1964-03-14                               (required) birthdate of the covid certificate owner. Format:
                                                         ISO 8601 date without time.

  --familyName=Rochat                                    (required) family name of the covid certificate owner

  --givenName=Céline                                     (required) given name of the covid certificate owner

  --keyFile=~/a0000-cc-cli-TEST.encrypted.key            (required) path to PEM encoded private key

  --keyPassphrase=abcdefghijklmnopqrstuvwxyz             passphrase to decrypt the private key

  --language=fr                                          [default: de] Accepted languages are: de, it, fr, rm

  --local                                                adds additional headers required to mock the WSG

  --manufacturerCode=1304                                test manufacturer code. This should only be sent when it is not
                                                         a PCR test

  --memberStateOfTest=CH                                 (required) the country in which the covid certificate owner has
                                                         been tested. Format: string (2 chars according to ISO 3166
                                                         Country Codes).

  --otp=a.b.c                                            (required) the otp secret

  --outDir=out                                           (required) [default:
                                                         /var/folders/hv/73dvbzz14ms96bgl5xlyxgww0000gn/T] output
                                                         directory

  --sampleDateTime=2021-05-22T11:12:85Z                  (required) date and time of the test sample collection. Format:
                                                         ISO 8601 date incl. time.

  --testingCentreOrFacility=Walk-in-Lyss AG              (required) name of centre or facility.

  --typeCode=LP217198-3                                  type of test. This field is only mandatory when it is a PCR
                                                         test.

EXAMPLE

       export CC_CLI_OTP="a.b.c"
       export CC_CLI_KEY_PASSPHRASE="secret"
       export CC_CLI_BASE_URL="https://ws.covidcertificate-a.bag.admin.ch/"
       export CC_CLI_CERTIFICATE_FILE="ZH-spital-A-t.bit.admin.ch.cer"
       export CC_CLI_KEY_FILE="ZH-spital-A-t.bit.admin.ch.encrypted.key"
       export CC_CLI_OUT_DIR="out"
       cc-cli create-test \
         --language="de" \
         --familyName="Rochat" \
         --givenName="Céline" \
         --dateOfBirth="1964-03-14" \
         --typeCode="LP6464-4" \
         --sampleDateTime="2020-01-01T17:29:41.063Z" \
         --testingCentreOrFacility="Walk-in-Lyss AG" \
         --memberStateOfTest="CH"
```

_See code: [src/commands/create-test.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v1.4.0/src/commands/create-test.ts)_

## `cc-cli create-vaccination`

create a vaccination certificate

```
USAGE
  $ cc-cli create-vaccination

OPTIONS
  -d, --debug                                            enable debug output.
  --baseUrl=https://ws.covidcertificate-a.bag.admin.ch/  (required) the url of the REST API
  --certificateFile=~/a0000-cc-cli-TEST.cer              (required) path to PEM encoded certificate

  --countryOfVaccination=CH                              (required) the country in which the covid certificate owner has
                                                         been vaccinated. Format: string (2 chars according to ISO 3166
                                                         Country Codes).

  --dateOfBirth=1964-03-14                               (required) birthdate of the covid certificate owner. Format:
                                                         ISO 8601 date without time.

  --familyName=Rochat                                    (required) family name of the covid certificate owner

  --givenName=Céline                                     (required) given name of the covid certificate owner

  --keyFile=~/a0000-cc-cli-TEST.encrypted.key            (required) path to PEM encoded private key

  --keyPassphrase=abcdefghijklmnopqrstuvwxyz             passphrase to decrypt the private key

  --language=fr                                          [default: de] Accepted languages are: de, it, fr, rm

  --local                                                adds additional headers required to mock the WSG

  --medicinalProductCode=EU/1/20/1507                    (required) name of the medicinal product as registered in the
                                                         country.

  --numberOfDoses=2                                      (required) number in a series of doses

  --otp=a.b.c                                            (required) the otp secret

  --outDir=out                                           (required) [default:
                                                         /var/folders/hv/73dvbzz14ms96bgl5xlyxgww0000gn/T] output
                                                         directory

  --totalNumberOfDoses=2                                 (required) number in a series of doses

  --vaccinationDate=2020-01-01                           (required) date of vaccination. Format: ISO 8601 date without
                                                         time. Range: can be between 1900-01-01 and 2099-12-31

EXAMPLE

       export CC_CLI_OTP="a.b.c"
       export CC_CLI_KEY_PASSPHRASE="secret"
       export CC_CLI_BASE_URL="https://ws.covidcertificate-a.bag.admin.ch/"
       export CC_CLI_CERTIFICATE_FILE="ZH-spital-A-t.bit.admin.ch.cer"
       export CC_CLI_KEY_FILE="ZH-spital-A-t.bit.admin.ch.encrypted.key"
       export CC_CLI_OUT_DIR="out"
       cc-cli create-vaccination \
         --language="fr" \
         --familyName="Céline" \
         --givenName="Rochat" \
         --dateOfBirth="1964-03-14" \
         --medicinalProductCode="EU/1/20/1507" \
         --numberOfDoses="2" \
         --totalNumberOfDoses="2" \
         --vaccinationDate="2020-01-01" \
         --countryOfVaccination="CH"
```

_See code: [src/commands/create-vaccination.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v1.4.0/src/commands/create-vaccination.ts)_

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
  -h, --help                                   show CLI help
  --keyFile=~/a0000-cc-cli-TEST.encrypted.key  (required) path to PEM encoded private key
  --keyPassphrase=abcdefghijklmnopqrstuvwxyz   passphrase to decrypt the private key
  --otp=a.b.c                                  (required) the otp secret
```

_See code: [src/commands/pm-update.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v1.4.0/src/commands/pm-update.ts)_

## `cc-cli sign FILE`

reads a utf8 encoded text file, signs the text and writes the base64 encoded signature to stdout

```
USAGE
  $ cc-cli sign FILE

ARGUMENTS
  FILE  input file, should be JSON

OPTIONS
  -h, --help                                   show CLI help
  --keyFile=~/a0000-cc-cli-TEST.encrypted.key  (required) path to PEM encoded private key
  --keyPassphrase=abcdefghijklmnopqrstuvwxyz   passphrase to decrypt the private key
```

_See code: [src/commands/sign.ts](https://github.com/admin-ch/CovidCertificate-Api-Cli/blob/v1.4.0/src/commands/sign.ts)_
<!-- commandsstop -->
