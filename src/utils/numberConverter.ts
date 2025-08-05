export function formatNumber(
    value: number,
    options: {
        prefix?: string;
        suffix?: string;
        decimals?: number;
        forceDecimals?: boolean;
    } = {}
): string {
    const { prefix = '', suffix = '', decimals = 1, forceDecimals = false } = options;

    if (value === 0) return `${prefix}0${suffix}`;

    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    const units = [
        { threshold: 1e12, symbol: 'T' },  // Trillion
        { threshold: 1e9, symbol: 'B' },  // Billion
        { threshold: 1e6, symbol: 'M' },  // Million
        { threshold: 1e3, symbol: 'K' },  // Thousand
    ];


    for (const { threshold, symbol } of units) {
        if (absValue >= threshold) {
            const converted = absValue / threshold;

            let formatted: string;
            if (converted >= 10 && !forceDecimals) {
                formatted = Math.round(converted).toString();
            } else {
                formatted = converted.toFixed(decimals);

                if (!forceDecimals) {
                    formatted = parseFloat(formatted).toString();
                }
            }

            return `${prefix}${sign}${formatted}${symbol}${suffix}`;
        }
    }

    const formattedNumber = Math.round(absValue).toLocaleString();
    return `${prefix}${sign}${formattedNumber}${suffix}`;
}


export default formatNumber;