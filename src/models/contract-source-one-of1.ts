/* tslint:disable */
/* eslint-disable */
/**
 * OpenZeppelin Relayer API
 * OpenZeppelin Relayer API
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface ContractSourceOneOf1
 */
export interface ContractSourceOneOf1 {
    /**
     * 
     * @type {string}
     * @memberof ContractSourceOneOf1
     */
    'contract': string;
    /**
     * 
     * @type {string}
     * @memberof ContractSourceOneOf1
     */
    'from': ContractSourceOneOf1FromEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum ContractSourceOneOf1FromEnum {
    CONTRACT = 'contract'
}


