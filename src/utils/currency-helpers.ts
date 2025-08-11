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

// export const formatCurrencyCompact = (value: string | number) => {
//     const num = typeof value === "string" ? Number.parseFloat(value) : value;

//     const absNum = Math.abs(num);

//     if (absNum >= 1_000_000_000_000) {
//         return `${(num / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '')}T`;
//     } else if (absNum >= 1_000_000_000) {
//         return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
//     } else if (absNum >= 1_000_000) {
//         return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
//     } else if (absNum >= 1_000) {
//         return `${(num / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
//     }

//     return `${num.toFixed(0)}`;
// };

export const formatCurrencyCompact = (value: string | number) => {
    const num = typeof value === "string" ? Number.parseFloat(value) : value;
    const absNum = Math.abs(num);

    if (absNum >= 1_000_000_000_000) {
        return `${Math.round(num / 1_000_000_000_000)}T`;
    } else if (absNum >= 1_000_000_000) {
        return `${Math.round(num / 1_000_000_000)}B`;
    } else if (absNum >= 1_000_000) {
        return `${Math.round(num / 1_000_000)}M`;
    } else if (absNum >= 1_000) {
        return `${Math.round(num / 1_000)}K`;
    }

    return `${Math.round(num)}`;
};


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
