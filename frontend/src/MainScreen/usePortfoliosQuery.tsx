import { useSuspenseQuery } from '@tanstack/react-query';
import { PortfoliosData } from './types';
import { PortfolioScreenQueryKey } from '../constants';

const MOCK_PORTFOLIOS: PortfoliosData = {
    meta: {
        overallVolume: 16586,
        gainLoss: {
            inVolume: 166.32,
            inPercentage: 0.0306,
            type: "gain"
        }
    },
    items: [
        {
            meta: {
                volume: 5672,
                gainLoss: {
                    inVolume: 56.32,
                    inPercentage: 0.0102,
                    type: "loss"
                }
            },
            isMain: true,
            name: "Крипта тест",
            tags: ["Crypto"],
            colorScheme: "main"
        },
        {
            meta: {
                volume: 5672,
                gainLoss: {
                    inVolume: 56.32,
                    inPercentage: 0.0102,
                    type: "gain"
                }
            },
            isMain: false,
            name: "Металлы",
            tags: ["Crypto"],
            colorScheme: "pattensBlue"
        },
        {
            meta: {
                volume: 5672,
                gainLoss: {
                    inVolume: 56.32,
                    inPercentage: 0.0102,
                    type: "gain"
                }
            },
            isMain: false,
            name: "Металлы",
            tags: ["Crypto"],
            colorScheme: "springSun"
        },
        {
            meta: {
                volume: 5672,
                gainLoss: {
                    inVolume: 56.32,
                    inPercentage: 0.0102,
                    type: "gain"
                }
            },
            isMain: false,
            name: "Металлы",
            tags: ["Crypto"],
            colorScheme: "hintOfGreen"
        }
    ],
};

export const usePortfoliosQuery = () => {
    return useSuspenseQuery<PortfoliosData>({
        queryKey: [PortfolioScreenQueryKey],
        queryFn: () => {
            return Promise.resolve(MOCK_PORTFOLIOS);
        },
        retry: false //to bail out error asap
        //about initialData and placeholderData - https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query     
    })
}