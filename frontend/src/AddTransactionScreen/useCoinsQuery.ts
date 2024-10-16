import { useQuery } from "@tanstack/react-query"
import { TopTenCoinsQueryKey } from "../constants"
import { CoinOptions } from "../Api/coinSearch.schema";

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
        pricePerUnit: "2291.78",
        webp64: null
    },
    {
        coinName: "Tether",
        coinTicker: "USDT",
        pricePerUnit: "0.999208",
        webp64: null
    },
    {
        coinName: "BNB",
        coinTicker: "BNB",
        pricePerUnit: "545.15",
        webp64: null
    },
    {
        coinName: "Solana",
        coinTicker: "SOL",
        pricePerUnit: "130.47",
        webp64: null
    },
    {
        coinName: "USD Coin",
        coinTicker: "USDC",
        pricePerUnit: "0.998974",
        webp64: null
    },
    {
        coinName: "XRP",
        coinTicker: "XRP",
        pricePerUnit: "0.570564",
        webp64: null
    },
    {
        coinName: "Toncoin",
        coinTicker: "TONCOIN",
        pricePerUnit: "5.53",
        webp64: null
    },
    {
        coinName: "Dogecoin",
        coinTicker: "DOGE",
        pricePerUnit: "0.101536",
        webp64: null
    },
    {
        coinName: "TRON",
        coinTicker: "TRX",
        pricePerUnit: "0.148560",
        webp64: null
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
            }, 1100));
        },
        staleTime: Infinity,
        retry: false,
        refetchOnWindowFocus: false,
    })
}