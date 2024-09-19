import { useQuery } from "@tanstack/react-query"
import { CoinOptions } from "./types"
import { TopTenCoinsQueryKey } from "../constants"

const MOCK_TOPTENCOINS: CoinOptions = [
    {
        coinName: "Bitcoin",
        coinTicker: "BTC",
        pricePerUnit: "58669.22",
        webp64: "/img/btc.webp"
    },
    {
        coinName: "Ethereum",
        coinTicker: "ETH",
        pricePerUnit: "2291.78"
    },
    {
        coinName: "Tether",
        coinTicker: "USDT",
        pricePerUnit: "0.999208"
    },
    {
        coinName: "BNB",
        coinTicker: "BNB",
        pricePerUnit: "545.15"
    },
    {
        coinName: "Solana",
        coinTicker: "SOL",
        pricePerUnit: "130.47"
    },
    {
        coinName: "USD Coin",
        coinTicker: "USDC",
        pricePerUnit: "0.998974"
    },
    {
        coinName: "XRP",
        coinTicker: "XRP",
        pricePerUnit: "0.570564"
    },
    {
        coinName: "Toncoin",
        coinTicker: "TONCOIN",
        pricePerUnit: "5.53"
    },
    {
        coinName: "Dogecoin",
        coinTicker: "DOGE",
        pricePerUnit: "0.101536"
    },
    {
        coinName: "TRON",
        coinTicker: "TRX",
        pricePerUnit: "0.148560"
    }
];

export const useCoinsQuery = () => {
    return useQuery<CoinOptions>({
        queryKey: [TopTenCoinsQueryKey],
        queryFn: () => {
            //simulate network delay
            //await CoinsApi.search("", 10)
            return new Promise(res => setTimeout(() => {
                res(MOCK_TOPTENCOINS);
            }, 1000));
        },
        staleTime: Infinity,
        retry: false,
        refetchOnWindowFocus: false,
    })
}