#!/usr/bin/env sh

# get via the WebUI
export CC_CLI_OTP=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI1MDNkNWY4OS03NGI0LTQxZGUtYTQyNC03MTY3ZWE0NTU4ZTkiLCJpc3MiOiJodHRwczovL2NvdmlkY2VydGlmaWNhdGUtbWFuYWdlbWVudC1kLmJhZy5hZG1pbi5jaCIsImlhdCI6MTYyMTYxOTM5MSwibmJmIjoxNjIxNjE5MzkxLCJzY29wZSI6ImNvdmlkY2VydGNyZWF0aW9uIiwidXNlckV4dElkIjoiMTIzNDU2IiwiaWRwc291cmNlIjoiRS1JRCBDSC1MT0dJTiIsImV4cCI6MTYyMTY2MjU5MX0.DlgPntBVYzwTF3IpUuWLQR9oaggKBYW2Eu-3piHA3fEs9MQBAFOyheKn7LGSqMSM8Zz2lez3OY8MFwzqyDliDh4R3P8Au3vSh3AHAusfE1Vm50l9-5247ty55E_5yMcsmp6fw5aymQBpEWwBcHjKBjD4LJ8A-yCXNLJACuONyFfQoDf-2KQM1XmBHKKWVB3huqiBRlb7p6Q7bKOoYorDPEW4P7O_Ciz0WfC6O26SudDRf5tydgflNV7XXJBIVCzR1Jr6NK9MH4MneG8_D48_4Rowzemih6lJCX5pAZXDj6xaOk0RAYXr51HijG8tCNhb6H8uxYTP2PN4NzvEk7VDnw

export CC_CLI_BASE_URL="https://ws.covidcertificate-r.bag.admin.ch/"
export CC_CLI_CERTIFICATE_FILE="ZH-spital-A-t.bit.admin.ch.cer"
export CC_CLI_KEY_FILE="ZH-spital-A-t.bit.admin.ch.key"
export CC_CLI_OUT_DIR="out"

# to mock WSG certificate headers
#export CC_CLI_LOCAL=true

cc-cli create-recovery \
    --language="de" \
    --familyName="Federer" \
    --givenName="Roger" \
    --dateOfBirth="1981-08-08" \
    --dateOfFirstPositiveTestResult="2020-01-01" \
    --countryOfTest="CH"
