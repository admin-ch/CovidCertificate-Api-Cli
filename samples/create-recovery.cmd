:: get via the WebUI
set CC_CLI_OTP=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJlNDVmNGY4ZS1jYzhhLTRlYzItOTE0MC1jYjI3NDRiMDM2YTciLCJpc3MiOiJodHRwczovL2NvdmlkY2VydGlmaWNhdGUtbWFuYWdlbWVudC1kLmJhZy5hZG1pbi5jaCIsImlhdCI6MTYyMTkzMzg5MCwibmJmIjoxNjIxOTMzODkwLCJzY29wZSI6ImNvdmlkY2VydGNyZWF0aW9uIiwidXNlckV4dElkIjoiMTIzNDU2IiwiaWRwc291cmNlIjoiRS1JRCBDSC1MT0dJTiIsImV4cCI6MTYyMTk3NzA5MH0.BtQn5MCJnbTuCHG3tMnQpNH2q8RyABwiQ6fdEulSVt45in4RfOOuKjmyGafhfbWP5dUyfrw_GfZwNY6fqOW6gCwQmtz_etb14e6qCtmhSGWpVQFadjCh0GbbrscMvWIPHR26R89reVg6-MmmGd3ik6tM8NbzmANa_AhGM49TN2TS_wRxjjt6c362kiR8yZBICxhdHn0yLy_kjzMjqIi-g19CTn93JBhIRMmBcCL4uI4s9RbP_eGYH-8oN-vQ-cKoBQ20nsXLA3dyakMZ6gYfYFPvzg1d4kDfUSDnXZ-RDnXZkdcIJOHMbzzWyGkOBGuwk40ziNhPTk__vtjWc43V4A

set CC_CLI_BASE_URL=https://ws.covidcertificate-r.bag.admin.ch/
set CC_CLI_CERTIFICATE_FILE=ZH-spital-A-t.bit.admin.ch.cer
set CC_CLI_KEY_FILE=ZH-spital-A-t.bit.admin.ch.key
set CC_CLI_OUT_DIR=out

:: to mock WSG certificate headers
::set CC_CLI_LOCAL=true

cc-cli create-recovery ^
    --language="de" ^
    --familyName="Federer" ^
    --givenName="Roger" ^
    --dateOfBirth="1981-08-08" ^
    --dateOfFirstPositiveTestResult="2020-01-01" ^
    --countryOfTest="CH"
