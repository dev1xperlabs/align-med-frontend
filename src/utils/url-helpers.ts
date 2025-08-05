/**
 * URL parameter management utilities
 */

import { buildUrlWithMultipleParams } from "./api-helpers"

export interface UrlUpdateParams {
    groupBy?: string
    metricType?: string
    dateRange?: string
    attorneys?: string[]
    viewType?: string
    page?: number
    pageSize?: number
}

export const createUrlUpdater = (router: any, basePath: string, currentState: UrlUpdateParams) => {
    return (params: Record<string, string | number | string[]>, overrideState?: UrlUpdateParams) => {
        const mergedParams = { ...currentState, ...overrideState, ...params }

        // Build URL with support for multiple values
        const urlParams: Record<string, any> = {}

        Object.entries(mergedParams).forEach(([key, value]) => {
            if (key === "attorneys" && Array.isArray(value)) {
                // Handle attorney array specially
                urlParams["attorney"] = value.filter((v) => v && v !== "")
            } else if (value && value !== "") {
                urlParams[key] = value
            }
        })

        const newUrl = buildUrlWithMultipleParams(basePath, urlParams)
        router.push(newUrl, { scroll: false })
    }
}
