import { useQuery } from '@tanstack/react-query';
import { PortfolioScreenQueryKey } from '../constants';
import { PortfolioApi } from '../Api/PortfolioApi';
import { Portfolio } from '../Api/portfolio.schema';

type UsePortfolioQueryProps = {
    readonly id: number;
}

export const usePortfolioQuery = ({ id }: UsePortfolioQueryProps) => {
    return useQuery<Portfolio | null>({
        queryKey: [PortfolioScreenQueryKey, id],
        queryFn: () => PortfolioApi.getPortfolio(id),
        throwOnError: true,
    })
}