#!/usr/bin/env sh

# get via the WebUI
export CC_CLI_OTP=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiI2Yzk0MTYzMC03NGRlLTQ0ZWEtOGU0NS03YWMzMGUyODRlZmMiLCJpc3MiOiJodHRwczovL2NvdmlkY2VydGlmaWNhdGUtbWFuYWdlbWVudC1kLmJhZy5hZG1pbi5jaCIsImlhdCI6MTYyMTk1NjcxMiwibmJmIjoxNjIxOTU2NzEyLCJzY29wZSI6ImNvdmlkY2VydGNyZWF0aW9uIiwidXNlckV4dElkIjoiMTIzNDU2IiwiaWRwc291cmNlIjoiRS1JRCBDSC1MT0dJTiIsInR5cCI6ImF1dGhtYWNoaW5lK2p3dCIsImV4cCI6MTYyMTk5OTkxMn0.anpYUBZXwAJsjj0Q7PCT8-Kz3SDIYLMSlYWIGB_WKLMEzX4sbTW_cpRuE3aBKYNM5CoQKxbEYWyU8JTnhKZRiHxHmUYp6JuaihGND9Jr0CsKgPMTjmklXSMhsj54NWMFYxiPBb5U6L5e6BOMQ5Wm4UDsrvhJbvVDc5Ld9LsQiV_9iByLpUIFPFZuD3l0-l7prFYfSeNsVcR8_wSVSm8vJ3EES4u_CxQ6lF_V91kfhg8yxQuGsm6e79wB1siXsxnIUCoc78m1f7DcLKZaef9fz-xvONIqaO5X7BpPw5ySYLgxMC6fKZZa3FfO38hRMbsoeUuO7B1u26L7hLzE8K8hCQ

export CC_CLI_KEY_FILE="ZH-spital-A-t.bit.admin.ch.key"
export CC_CLI_CERTIFICATE_FILE="ZH-spital-A-t.bit.admin.ch.cer"

# without env
#cc-cli pm-update \
#  --keyFile="ZH-spital-A-t.bit.admin.ch.key" \
#  --otp="otp" \
#  "CC_API-Gateway_Tests.postman_collection"

cc-cli pm-update \
  --keyFile="ZH-spital-A-t.bit.admin.ch.key" \
  "CC_API-Gateway_Tests.postman_collection.json"

newman run "CC_API-Gateway_Tests.postman_collection.json" \
  --env-var WSG="https://ws.covidcertificate-r.bag.admin.ch" \
  --ssl-client-cert $CC_CLI_CERTIFICATE_FILE \
  --ssl-client-key $CC_CLI_KEY_FILE
