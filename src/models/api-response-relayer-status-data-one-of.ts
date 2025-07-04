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
 * @interface ApiResponseRelayerStatusDataOneOf
 */
export interface ApiResponseRelayerStatusDataOneOf {
    /**
     * 
     * @type {string}
     * @memberof ApiResponseRelayerStatusDataOneOf
     */
    'balance': string;
    /**
     * 
     * @type {string}
     * @memberof ApiResponseRelayerStatusDataOneOf
     */
    'last_confirmed_transaction_timestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof ApiResponseRelayerStatusDataOneOf
     */
    'network_type': ApiResponseRelayerStatusDataOneOfNetworkTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof ApiResponseRelayerStatusDataOneOf
     */
    'nonce': string;
    /**
     * 
     * @type {boolean}
     * @memberof ApiResponseRelayerStatusDataOneOf
     */
    'paused': boolean;
    /**
     * 
     * @type {number}
     * @memberof ApiResponseRelayerStatusDataOneOf
     */
    'pending_transactions_count': number;
    /**
     * 
     * @type {boolean}
     * @memberof ApiResponseRelayerStatusDataOneOf
     */
    'system_disabled': boolean;
}

/**
    * @export
    * @enum {string}
    */
export enum ApiResponseRelayerStatusDataOneOfNetworkTypeEnum {
    EVM = 'evm'
}


