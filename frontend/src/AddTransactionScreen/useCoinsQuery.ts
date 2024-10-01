import { useQuery } from "@tanstack/react-query"
import { TopTenCoinsQueryKey } from "../constants"
import { CoinsApi } from "../Api/CoinsApi";
import { CoinOptions } from "../Api/coinSearch.schema";

export const useCoinsQuery = () => {
    return useQuery<CoinOptions>({
        queryKey: [TopTenCoinsQueryKey],
        queryFn: () => CoinsApi.search(),
        staleTime: Infinity,
        retry: false,
        refetchOnWindowFocus: false,
    })
}