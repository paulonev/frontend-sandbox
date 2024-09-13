import { DifferenceType } from "../Entities/Portfolio/types";
import { isGain } from "../MainScreen/types";

export const formatPrice = (price: number, currency: string, locale: string = 'en-US'): string => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(price);
};

export const formatPercentage = (percentage: number, locale: string = 'en-US') => {
    const formattedPercentage = new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(percentage);

    return formattedPercentage;
}

//percentage is the number divided by 100
export const formatGainLossWithPercentage = (price: number, currency: string, percentage: number, type: DifferenceType, locale: string = 'en-US'): string => {
    return `${isGain(type) ? '+' : '-'} ${formatPrice(price, currency)} (${formatPercentage(percentage, locale)})`;
}

export const formatGainLoss = (price: number, currency: string, type: DifferenceType): string => {
    return `${isGain(type) ? '+' : '-'} ${formatPrice(price, currency)}`;
}
