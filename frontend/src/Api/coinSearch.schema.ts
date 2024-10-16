import { z } from "zod";

export const CoinOptionsSchema = z.object({
    coinName: z.string(),
    coinTicker: z.string(),
    pricePerUnit: z.string(),  // decimal("price_per_unit", 25, 15) [\d]*10.[\d]*15
    webp64: z.string().nullable()
}).array();

export type CoinOptions = z.infer<typeof CoinOptionsSchema>;