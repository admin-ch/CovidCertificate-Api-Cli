/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CovidCertificatePersonNameDto } from './CovidCertificatePersonNameDto';
import type { RecoveryCertificateDataDto } from './RecoveryCertificateDataDto';

export type RecoveryCertificateCreateDto = {
    otp?: string;
    name?: CovidCertificatePersonNameDto;
    /**
     * birthdate of the covid certificate owner. Format: ISO 8601 date without time. Range: can be between 1900-01-01 and 2099-12-31. Regexp: "[19|20][0-9][0-9]-(0[1-9]|1[0-2])-([0-2][1-9]|3[0|1])".
     */
    dateOfBirth?: string;
    recoveryInfo?: Array<RecoveryCertificateDataDto>;
    /**
     * Accepted languages are: de, it, fr, rm
     */
    language?: string;
}
