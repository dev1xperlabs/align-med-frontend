/**
 * Helper functions for API data processing
 */

// Extract API response data safely
export const extractApiResponse = (data: any) => {
    if (Array.isArray(data)) {
        return {
            results: data,
            count: data.length,
        }
    }

    if (data && typeof data === "object" && "results" in data) {
        return {
            results: data.results || [],
            count: data.count || data.results?.length || 0,
        }
    }

    if (data && typeof data === "object") {
        return {
            results: [data],
            count: 1,
        }
    }

    return {
        results: [],
        count: 0,
    }
}

// Build URL with multiple values for the same parameter
export const buildUrlWithMultipleParams = (baseUrl: string, params: Record<string, any>): string => {
    const url = new URL(baseUrl, window.location.origin)

    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            // For arrays, add multiple parameters with the same key
            value.forEach((v) => {
                if (v !== null && v !== undefined && v !== "") {
                    url.searchParams.append(key, v.toString())
                }
            })
        } else if (value !== null && value !== undefined && value !== "") {
            url.searchParams.set(key, value.toString())
        }
    })

    return url.toString()
}

// Create attorney name to ID mapping
export const createAttorneyNameToIdMap = (attorneys: Array<{ id: number; name: string }>) => {
    const map = new Map<string, number>()
    attorneys.forEach((attorney) => {
        if (attorney && attorney.name && attorney.id) {
            map.set(attorney.name, attorney.id)
        }
    })
    return map
}

// Create attorney ID to name mapping
export const createAttorneyIdToNameMap = (attorneys: Array<{ id: number; name: string }>) => {
    const map = new Map<number, string>()
    attorneys.forEach((attorney) => {
        if (attorney && attorney.name && attorney.id) {
            map.set(attorney.id, attorney.name)
        }
    })
    return map
}

// Get unique attorney options for filters
export const getUniqueAttorneyOptions = (attorneys: Array<{ id: number; name: string }>) => {
    if (!attorneys || attorneys.length === 0) return []

    const uniqueNames = new Set(
        attorneys.filter((attorney) => attorney && attorney.name).map((attorney) => attorney.name),
    )

    return Array.from(uniqueNames).sort()
}

// Convert attorney names to IDs
export const convertAttorneyNamesToIds = (attorneyNames: string[], nameToIdMap: Map<string, number>): number[] => {
    return attorneyNames.map((name) => nameToIdMap.get(name)).filter((id): id is number => id !== undefined)
}
