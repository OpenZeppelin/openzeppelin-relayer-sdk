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
import type { FeeEstimateRequestParams } from './fee-estimate-request-params';

/**
 * 
 * @export
 * @interface SolanaRpcRequestOneOf
 */
export interface SolanaRpcRequestOneOf {
    /**
     * 
     * @type {string}
     * @memberof SolanaRpcRequestOneOf
     */
    'method': SolanaRpcRequestOneOfMethodEnum;
    /**
     * 
     * @type {FeeEstimateRequestParams}
     * @memberof SolanaRpcRequestOneOf
     */
    'params': FeeEstimateRequestParams;
}

/**
    * @export
    * @enum {string}
    */
export enum SolanaRpcRequestOneOfMethodEnum {
    FEE_ESTIMATE = 'feeEstimate'
}


