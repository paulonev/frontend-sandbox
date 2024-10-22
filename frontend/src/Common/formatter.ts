export const formatPrice = (price: number, currency: string, locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
};

export const formatPercentage = (percentage: number, locale: string = 'en-US') => {
    const formattedPercentage = new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(percentage / 100);

    return formattedPercentage;
}

//percentage is the number divided by 100   
export const formatGainLossWithPercentage = (price: number, currency: string, percentage: number, locale: string = 'en-US'): string => {
    return `${formatPrice(price, currency)} (${formatPercentage(percentage, locale)})`;
}

export const formatGainLoss = (price: number, currency: string): string => {
    return `${formatPrice(price, currency)}`;
}
