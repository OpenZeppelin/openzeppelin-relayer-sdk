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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, type RequestArgs, BaseAPI, RequiredError, operationServerMap } from '../base';
/**
 * HealthApi - axios parameter creator
 * @export
 */
export const HealthApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * Note: OpenAPI documentation for these endpoints can be found in the `openapi.rs` file Handles the `/health` endpoint.  Returns an `HttpResponse` with a status of `200 OK` and a body of `\"OK\"`.
         * @summary Health routes implementation
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        health: async (options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/v1/health`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * HealthApi - functional programming interface
 * @export
 */
export const HealthApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = HealthApiAxiosParamCreator(configuration)
    return {
        /**
         * Note: OpenAPI documentation for these endpoints can be found in the `openapi.rs` file Handles the `/health` endpoint.  Returns an `HttpResponse` with a status of `200 OK` and a body of `\"OK\"`.
         * @summary Health routes implementation
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async health(options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<string>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.health(options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['HealthApi.health']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * HealthApi - factory interface
 * @export
 */
export const HealthApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = HealthApiFp(configuration)
    return {
        /**
         * Note: OpenAPI documentation for these endpoints can be found in the `openapi.rs` file Handles the `/health` endpoint.  Returns an `HttpResponse` with a status of `200 OK` and a body of `\"OK\"`.
         * @summary Health routes implementation
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        health(options?: RawAxiosRequestConfig): AxiosPromise<string> {
            return localVarFp.health(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * HealthApi - object-oriented interface
 * @export
 * @class HealthApi
 * @extends {BaseAPI}
 */
export class HealthApi extends BaseAPI {
    /**
     * Note: OpenAPI documentation for these endpoints can be found in the `openapi.rs` file Handles the `/health` endpoint.  Returns an `HttpResponse` with a status of `200 OK` and a body of `\"OK\"`.
     * @summary Health routes implementation
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HealthApi
     */
    public health(options?: RawAxiosRequestConfig) {
        return HealthApiFp(this.configuration).health(options).then((request) => request(this.axios, this.basePath));
    }
}

