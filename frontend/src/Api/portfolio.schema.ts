import { z } from "zod";
import { PortfolioDifferenceSchema } from "./portfolios.schema";

const PortfolioAssetVolume = z.object({
    inAmount: z.number(),
    inFiat: z.number()
});

const PortfolioBalance = z.object({
    volume: z.number(),
    currencyCode: z.string().nullish(), //USD, by default
    currency: z.string().nullish() //$, by default
});
export type PortfolioBalance = z.infer<typeof PortfolioBalance>;

const PortfolioAssetShortView = z.object({
    id: z.number(),
    fullName: z.string(),
    logoUrl: z.string().optional(),
    gainLoss: PortfolioDifferenceSchema
});
export type PortfolioAssetShortView = z.infer<typeof PortfolioAssetShortView>;

const PortfolioAsset = PortfolioAssetShortView.merge(z.object({ shortName: z.string().nullable(), volume: PortfolioAssetVolume }));
export type PortfolioAsset = z.infer<typeof PortfolioAsset>;

const PortfolioAssets = z.object({
    best: PortfolioAssetShortView.nullable(),
    worst: PortfolioAssetShortView.nullable(),
    items: PortfolioAsset.array()
})
export type PortfolioAssets = z.infer<typeof PortfolioAssets>;

export const PortfolioSchema = z.object({
    id: z.number(),
    name: z.string(),
    overallVolume: z.number(),
    gainLossDay: PortfolioDifferenceSchema,
    gainLossAllTime: PortfolioDifferenceSchema,
    balance: PortfolioBalance,
    assets: PortfolioAssets
});
export type Portfolio = z.infer<typeof PortfolioSchema>;