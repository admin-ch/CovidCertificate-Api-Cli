/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TestCertificateDataDto = {
    /**
     * type of test. This field is only mandatory when it is a PCR test. If given with manufacturerCode as well, they must match otherwise there will be a 400 BAD REQUEST.
     */
    typeCode?: string;
    /**
     * test manufacturer code. This should only be sent when it is not a PCR test, otherwise there will be a 400 BAD REQUEST.
     */
    manufacturerCode?: string;
    /**
     * date and time of the test sample collection. Format: ISO 8601 date incl. time.
     */
    sampleDateTime?: string;
    /**
     * date and time of the test result production (optional for rapid antigen test). Format: ISO 8601 date incl. time.
     */
    resultDateTime?: string;
    /**
     * name of centre or facility. Format: string, maxLength: 50 CHAR.
     */
    testingCentreOrFacility?: string;
    /**
     * the country in which the covid certificate owner has been tested. Format: string (2 chars according to ISO 3166 Country Codes).
     */
    memberStateOfTest?: string;
}
