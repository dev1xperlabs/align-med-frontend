// Central export for all constants
export * from "./table-configs"

// Add other common constants
export const APP_CONFIG = {
  name: "Align Med",
  description: "Medical practice management dashboard",
  version: "1.0.0",
} as const

export const API_CONFIG = {
  timeout: 60 * 5000, // 5 minutes
  retries: 3,
} as const

export const PAGINATION_CONFIG = {
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 25, 50],
} as const
