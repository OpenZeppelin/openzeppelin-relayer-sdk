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
 * Use the transaction source account for authorization
 * @export
 * @interface AuthSpecOneOf1
 */
export interface AuthSpecOneOf1 {
    /**
     * 
     * @type {string}
     * @memberof AuthSpecOneOf1
     */
    'type': AuthSpecOneOf1TypeEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum AuthSpecOneOf1TypeEnum {
    SOURCE_ACCOUNT = 'source_account'
}


