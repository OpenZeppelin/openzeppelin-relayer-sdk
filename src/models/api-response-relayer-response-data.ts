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


// May contain unused imports in some cases
// @ts-ignore
import type { NetworkPolicyResponse } from './network-policy-response';
// May contain unused imports in some cases
// @ts-ignore
import type { NetworkType } from './network-type';

/**
 * 
 * @export
 * @interface ApiResponseRelayerResponseData
 */
export interface ApiResponseRelayerResponseData {
    /**
     * 
     * @type {string}
     * @memberof ApiResponseRelayerResponseData
     */
    'address': string;
    /**
     * 
     * @type {string}
     * @memberof ApiResponseRelayerResponseData
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof ApiResponseRelayerResponseData
     */
    'name': string;
    /**
     * 
     * @type {string}
     * @memberof ApiResponseRelayerResponseData
     */
    'network': string;
    /**
     * 
     * @type {NetworkType}
     * @memberof ApiResponseRelayerResponseData
     */
    'network_type': NetworkType;
    /**
     * 
     * @type {boolean}
     * @memberof ApiResponseRelayerResponseData
     */
    'paused': boolean;
    /**
     * 
     * @type {NetworkPolicyResponse}
     * @memberof ApiResponseRelayerResponseData
     */
    'policies': NetworkPolicyResponse;
    /**
     * 
     * @type {boolean}
     * @memberof ApiResponseRelayerResponseData
     */
    'system_disabled': boolean;
}



