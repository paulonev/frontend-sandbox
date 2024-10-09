import { useQuery } from '@tanstack/react-query';
import { PortfolioScreenQueryKey } from '../constants';
import { PortfolioApi } from '../Api/PortfolioApi';
import { Portfolio } from '../Api/portfolio.schema';
import { z } from 'zod';

type UsePortfolioQueryProps = {
    readonly id: number;
}

export const usePortfolioQuery = ({ id }: UsePortfolioQueryProps) => {
    return useQuery<Portfolio | null>({
        queryKey: [PortfolioScreenQueryKey, id],
        queryFn: async () => {
            const portfolio = await PortfolioApi.getPortfolio(id);
            if (portfolio === null) {
                return null;
            }

            //sort in descending order
            portfolio.assets.items.sort((a, b) => b.volume.inFiat - a.volume.inFiat);

            return portfolio;
        },
        retry: (_, error) => !(error instanceof z.ZodError)
    })
}