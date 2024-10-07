import { useSuspenseQuery } from "@tanstack/react-query"
import { PortfolioApi } from "./Api/PortfolioApi";
import { UserPortfoliosCountQueryKey } from "./constants";

export const useUserPortfoliosCountQuery = () => {
    return useSuspenseQuery<{ portfoliosCount: number; }>({
        queryKey: [UserPortfoliosCountQueryKey],
        queryFn: async () => {
            const response = await PortfolioApi.getPortfolios()
            
            return { portfoliosCount: response.items.length };
        },
        retry: false,
        staleTime: Infinity
    })
}