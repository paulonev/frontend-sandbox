import { useSuspenseQuery } from "@tanstack/react-query"
import { UserPortfoliosCountQueryKey } from "./constants";

export const useUserPortfoliosCountQuery = () => {
    return useSuspenseQuery<{ portfoliosCount: number; }>({
        queryKey: [UserPortfoliosCountQueryKey],
        queryFn: async () => {
            return { portfoliosCount: 2 };
        },
        retry: false,
        staleTime: Infinity
    })
}