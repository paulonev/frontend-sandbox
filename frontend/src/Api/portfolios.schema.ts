import { z } from "zod";

const DifferenceType = z.enum(["gain", "loss"] as const);
export type DifferenceType = z.infer<typeof DifferenceType>;

const PortfolioSecondaryColorScheme = z.enum(["pattensBlue", "bridalHeath", "pinkLace", "hintOfGreen", "springSun", "blueChalk"]);
export type PortfolioSecondaryColorScheme = z.infer<typeof PortfolioSecondaryColorScheme>;

const PortfolioColorScheme = z.literal("main").or(PortfolioSecondaryColorScheme);
export type PortfolioColorScheme = z.infer<typeof PortfolioColorScheme>;

const PortfolioDifference = z.object({
    type: DifferenceType,
    inVolume: z.number(),
    inPercentage: z.number(),
});
export type PortfolioDifference = z.infer<typeof PortfolioDifference>;

const PortfoliosMeta = z.object({
    overallVolume: z.number(),
    gainLoss: PortfolioDifference
});
export type PortfoliosMeta = z.infer<typeof PortfoliosMeta>;

const PortfolioMeta = z.object({
    volume: z.number(),
    gainLoss: PortfolioDifference
});
export type PortfolioMeta = z.infer<typeof PortfolioMeta>;

const PortfolioItem = z.object({
    id: z.number(),
    meta: PortfolioMeta,
    isMain: z.boolean(),
    name: z.coerce.string(),
    tags: z.coerce.string().array().optional(),
    colorScheme: PortfolioColorScheme,
});
export type PortfolioItem = z.infer<typeof PortfolioItem>;

export const PortfoliosDataSchema = z.object({
    meta: PortfoliosMeta,
    items: PortfolioItem.array()
});
export type PortfoliosData = z.infer<typeof PortfoliosDataSchema>;
