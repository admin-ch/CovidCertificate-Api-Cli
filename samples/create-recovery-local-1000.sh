#!/usr/bin/env sh

# get via the WebUI
export CC_CLI_OTP=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJkZDViNjVlNC0xOGJmLTQ3MTktODRiNi1jMjZiZTA2NDY3OTkiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgxMTMiLCJpYXQiOjE2MjIzNzAyMzcsIm5iZiI6MTYyMjM3MDIzNywic2NvcGUiOiJjb3ZpZGNlcnRjcmVhdGlvbiIsInVzZXJleHRpZCI6IjUzNDkiLCJpZHBzb3VyY2UiOiJDSExPR0lOIiwiZXhwIjoxNjIyNDEzNDM3fQ.R0cm4qjcNQCbLMT4NF4tyE6I-NUaF0Gtmu1RBXY7ZSDvKWIlY1CJBIfodIRyDhyh_fJVys57udT6VP4DvWDBSQGpupIO78gMDLZYX1C3JLnPR64fL1LSFEH4q2n8xlUyID5e32gx1VjWcH9JPhf6od_x52InpUwe-wPK9NTHxFA92veCUzZ7amGyUvfXKAwlgbOBhoGdzRC0D-3PP4AeIjprzEgr3HZGienL2iU9Cwgjaabd9PFU6VAFhhz5JD0HnSErF-FCF45JPIk926goy-P5UWXmJ-pad4N7s3790xvoK2fB1WmWVVAaxbjsH0w8z6iRWo-p_ChZQUpbhF0YgA

export CC_CLI_BASE_URL="http://localhost:8121/"
export CC_CLI_CERTIFICATE_FILE="ZH-spital-A-t.bit.admin.ch.cer"
export CC_CLI_KEY_FILE="ZH-spital-A-t.bit.admin.ch.key"
export CC_CLI_OUT_DIR="out"
# to mock WSG certificate headers
export CC_CLI_LOCAL=true

cc-cli create-recovery \
    --language="de" \
    --familyName="Rochat" \
    --givenName="Céline" \
    --dateOfBirth="1964-03-14" \
    --dateOfFirstPositiveTestResult="2020-01-01" \
    --countryOfTest="CH" \
    --testIterations=1000

