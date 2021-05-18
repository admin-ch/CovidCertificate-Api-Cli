/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type VaccinationCertificateDataDto = {
    /**
     * name of the medicinal product as registered in the country.
     */
    medicinalProductCode?: string;
    /**
     * number in a series of doses.
     */
    numberOfDoses?: number;
    /**
     * total series of doses.
     */
    totalNumberOfDoses?: number;
    /**
     * date of vaccination. Format: ISO 8601 date without time. Range: can be between 1900-01-01 and 2099-12-31. Regexp: "[19|20][0-9][0-9]-(0[1-9]|1[0-2])-([0-2][1-9]|3[0|1])".
     */
    vaccinationDate?: string;
    /**
     * the country in which the covid certificate owner has been vaccinated. Format: string (2 chars according to ISO 3166 Country Codes).
     */
    countryOfVaccination?: string;
}
