import { PortfolioDifference } from "../Entities/Portfolio/types";

export type PortfolioAssetVolume = {
    readonly inAmount: number;
    readonly inFiat: number;
}

export type PortfolioBalance = {
    readonly volume: number;
    readonly currencyCode?: string; //USD
    readonly currency?: string; //$
}

export type PortfolioAssetShortView = {
    readonly id: number;
    readonly fullName: string;
    readonly logoUrl?: string;
    readonly gainLoss: PortfolioDifference; 
}

export type PortfolioAsset = PortfolioAssetShortView & {
    readonly shortName?: string;
    readonly volume: PortfolioAssetVolume;
}

export type PortfolioAssets = {
    readonly best: PortfolioAssetShortView;
    readonly worst: PortfolioAssetShortView;
    readonly items: PortfolioAsset[];
}

export type Portfolio = {
    readonly id: number;
    readonly name: string;
    readonly overallVolume: number;
    readonly gainLossDay: PortfolioDifference;
    readonly gainLossAllTime: PortfolioDifference;
    readonly balance: PortfolioBalance;
    readonly assets: PortfolioAssets;
}