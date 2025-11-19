/**
 * Custom Plugin API Model
 *
 * This file contains custom type definitions for the Plugin API that are not generated
 * by the OpenAPI generator. This file is automatically copied to src/models/ by the
 * post-generate script after OpenAPI code generation.
 *
 * Note: Import paths use absolute references from project root and are automatically
 * normalized to relative paths when copied by scripts/post-generate.js
 */
/**
 * Minimal error class for plugin authors; SDK will mirror this.
 * @property message - The error message.
 * @property code - The error code.
 * @property status - The HTTP status code.
 * @property details - The error details.
 */
export class PluginError extends Error {
    constructor(message, opts) {
        super(message);
        this.name = 'PluginError';
        this.code = opts?.code;
        this.status = opts?.status;
        this.details = opts?.details;
    }
}
/**
 * Convenience helper.
 * @param message - The error message.
 * @param opts - The error options.
 * @returns The error object.
 */
export function pluginError(message, opts) {
    return new PluginError(message, opts);
}
