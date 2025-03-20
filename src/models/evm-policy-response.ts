/* tslint:disable */
 
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
 * @interface EvmPolicyResponse
 */
export interface EvmPolicyResponse {
    /**
     * 
     * @type {boolean}
     * @memberof EvmPolicyResponse
     */
    'eip1559_pricing'?: boolean;
    /**
     * 
     * @type {number}
     * @memberof EvmPolicyResponse
     */
    'gas_price_cap'?: number;
    /**
     * 
     * @type {number}
     * @memberof EvmPolicyResponse
     */
    'min_balance': number;
    /**
     * 
     * @type {boolean}
     * @memberof EvmPolicyResponse
     */
    'private_transactions': boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof EvmPolicyResponse
     */
    'whitelist_receivers'?: Array<string>;
}

