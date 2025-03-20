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
import type { ApiResponseBalanceResponseData } from './api-response-balance-response-data';
// May contain unused imports in some cases
// @ts-ignore
import type { PaginationMeta } from './pagination-meta';

/**
 * 
 * @export
 * @interface ApiResponseBalanceResponse
 */
export interface ApiResponseBalanceResponse {
    /**
     * 
     * @type {ApiResponseBalanceResponseData}
     * @memberof ApiResponseBalanceResponse
     */
    'data'?: ApiResponseBalanceResponseData;
    /**
     * 
     * @type {string}
     * @memberof ApiResponseBalanceResponse
     */
    'error'?: string;
    /**
     * 
     * @type {PaginationMeta}
     * @memberof ApiResponseBalanceResponse
     */
    'pagination'?: PaginationMeta;
    /**
     * 
     * @type {boolean}
     * @memberof ApiResponseBalanceResponse
     */
    'success': boolean;
}

