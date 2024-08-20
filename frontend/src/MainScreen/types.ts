import { PortfolioColorScheme } from "../Common/colors";

export type DifferenceType = "gain" | "loss";

export type PortfolioDifference = {
    readonly type: DifferenceType;
    readonly inVolume: number;
    readonly inPercentage: number;
}

export type PortfoliosMeta = {
    readonly overallVolume: number;
    readonly gainLoss: PortfolioDifference;
}

export type PortfolioMeta = {
    readonly volume: number;
    readonly gainLoss: PortfolioDifference;
}

export type PortfoliosData = {
    meta: PortfoliosMeta;
    items: PortfolioItem[];
}

export type CardSchemeStyles = {
    readonly bgColor: string;
    readonly textColor: string;
    readonly tagsBgColor: string;
    readonly gainColor: string;
    readonly lossColor: string;
}

export type PortfolioCardColorTheme = {
    [key in PortfolioColorScheme]: CardSchemeStyles;
}

export type PortfolioItem = {
    readonly meta: PortfolioMeta;
    readonly isMain: boolean;
    readonly name: string;
    readonly tags?: string[];
    readonly colorScheme: PortfolioColorScheme;
}

export type PortfolioType = "Crypto" | "Stocks";

export function isGain(type: DifferenceType): boolean { return type && type === "gain"; }
