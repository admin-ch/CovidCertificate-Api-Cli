#!/usr/bin/env sh

cc-cli create-recovery \
    --baseUrl="https://ws.covidcertificate-r.bag.admin.ch/" \
    --certificateFile="ZH-spital-A-t.bit.admin.ch.cer" \
    --keyFile="ZH-spital-A-t.bit.admin.ch.key" \
    --outDir="out" \
    --otp="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJiNzNmZjVjNy03MWI0LTRjYmEtYmQ1MC1hZTdhNzlhODQ0NDEiLCJpc3MiOiJodHRwczovL2NvdmlkY2VydGlmaWNhdGUtbWFuYWdlbWVudC1kLmJhZy5hZG1pbi5jaCIsImlhdCI6MTYyMTQ5NTQ5OSwibmJmIjoxNjIxNDk1NDk5LCJzY29wZSI6ImNvdmlkY2VydGNyZWF0aW9uIiwidXNlcmV4dGlkIjoiMTIzNDU2IiwiaWRwc291cmNlIjoiRS1JRCBDSC1MT0dJTiIsImV4cCI6MTYyMTUzODY5OX0.RjC7eP3Sd41LnhoMU3sJhx5v6Ab8-tKyAxQutPbmbdQN8_qC4Ok85wo5Yjvq66N2YzxdfWS_hH8lrl6FAzL1JhYV92VvOTGCXnHqRAjzu7J_vSqkfNmqPQS8AZLXuFDL4Mfg6syyQlEJqNvDtT_RKaTJ9PhHneFxxqiOAC3Pzrw7Sr_UvFrIBF7lRx8YWYZYEEGegpuomz_BHc4yFitXY0y_d4gWahPYaTZiRqga1D2A1_HNuXOuHBHnFuaNNnwjKDG8HG_HFTsv_e-Ubo7AIWnFTUWYQsFluEZPbmhH72AeLiDJoQPRbX3HIDrpEazRBeInJv49N8z26uys_mzLUQ" \
    --language="de" \
    --familyName="Federer" \
    --givenName="Roger" \
    --dateOfBirth="1981-08-08" \
    --dateOfFirstPositiveTestResult="2020-01-01" \
    --countryOfTest="CH" \

