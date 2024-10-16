import { useQuery } from '@tanstack/react-query';
import { MainScreenQueryKey } from '../constants';
import { PortfoliosData } from '../Api/portfolios.schema';

const MOCK_PORTFOLIOS: PortfoliosData = {
    meta: {
        overallVolume: 16586,
        gainLoss: {
            inVolume: 166.32,
            inPercentage: 0.0306,
        }
    },
    items: [
        {
            id: 1,
            meta: {
                volume: 5672,
                gainLoss: {
                    inVolume: 56.32,
                    inPercentage: 0.0102,
                }
            },
            isMain: true,
            name: "Крипта тест",
            tags: ["Crypto"],
            colorScheme: "pattensBlue"
        },
        {
            id: 2,
            meta: {
                volume: 5672,
                gainLoss: {
                    inVolume: 56.32,
                    inPercentage: 0.0102,
                }
            },
            isMain: false,
            name: "Металлы",
            tags: ["Crypto"],
            colorScheme: "pattensBlue"
        },
    ],
};

export const usePortfoliosQuery = () => {
    return useQuery<PortfoliosData>({
        queryKey: [MainScreenQueryKey],
        queryFn: () => {
            //simulate network delay
            return new Promise(res => setTimeout(() => {
                res(MOCK_PORTFOLIOS);
            }, 1000));
        },
        retry: false //to bail out error asap
        //about initialData and placeholderData - https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query     
    })
}