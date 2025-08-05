/**
 * Currency formatting utilities
 */

export const formatCurrency = (amount: string | number) => {
    const num = typeof amount === "string" ? Number.parseFloat(amount) : amount
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(num)
}

export const formatCurrencyCompact = (value: string | number) => {
    const num = typeof value === "string" ? Number.parseFloat(value) : value
    if (num >= 1000000) {
        return `$${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
        return `$${(num / 1000).toFixed(1)}K`
    }
    return `$${num.toFixed(0)}`
}

export const formatCellValue = (column: string, value: number) => {
    if (column.includes("Charges") || column.includes("Amount") || column.includes("revenue")) {
        return `$${value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}`
    }
    if (column.includes("Percentage")) {
        return `${value}%`
    }
    return value.toLocaleString()
}
