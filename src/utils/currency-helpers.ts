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
    return new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 2
    }).format(num);
};

export const formatCellValue = (value: any) => {
    // Check if the value is a string and starts with a dollar sign
    if (typeof value === "string" && value.startsWith("$")) {
        // Remove the '$'
        const numericString = value.substring(1);

        // Convert to a number
        const numberValue = parseFloat(numericString);

        // Check if the conversion was successful
        if (!isNaN(numberValue)) {
            // Format the number with commas and two decimal places
            return (
                "$ " +
                numberValue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })
            );
        }
    }
    return value
}