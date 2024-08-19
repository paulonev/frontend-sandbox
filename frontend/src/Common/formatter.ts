import { DifferenceType, isGain } from "../MainScreen/types";

export const formatPrice = (price: number, currency: string, locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
};

//percentage is the number divided by 100
export const formatGainLoss = (price: number, currency: string, percentage: number, type: DifferenceType, locale: string = 'en-US'): string => {
    const formattedPercentage = new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(percentage);

    return `${isGain(type) ? '+' : '-'} ${formatPrice(price, currency)} (${formattedPercentage})`;
}