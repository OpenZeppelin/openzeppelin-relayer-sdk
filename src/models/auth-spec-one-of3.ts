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
 * Advanced format - provide complete XDR auth entries as base64-encoded strings
 * @export
 * @interface AuthSpecOneOf3
 */
export interface AuthSpecOneOf3 {
    /**
     * 
     * @type {Array<string>}
     * @memberof AuthSpecOneOf3
     */
    'entries': Array<string>;
    /**
     * 
     * @type {string}
     * @memberof AuthSpecOneOf3
     */
    'type': AuthSpecOneOf3TypeEnum;
}

/**
    * @export
    * @enum {string}
    */
export enum AuthSpecOneOf3TypeEnum {
    XDR = 'xdr'
}


