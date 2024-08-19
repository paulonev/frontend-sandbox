import { useSuspenseQuery } from '@tanstack/react-query';
import { PortfoliosData } from './types';

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
        queryKey: ['portfoliosScreen'],
        queryFn: () => {
            return Promise.resolve(MOCK_PORTFOLIOS)
        },
        //about initialData and placeholderData - https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query
        initialData: {
            meta: {
                overallVolume: 1111,
                gainLoss: {
                    inVolume: 11,
                    inPercentage: 11,
                    type: "gain"
                }
            },
            items: [
                {
                    meta: {
                        volume: 111,
                        gainLoss: {
                            inVolume: 11,
                            inPercentage: 11,
                            type: "gain"
                        }
                    },
                    isMain: true,
                    name: "Undefined",
                    tags: ["undefined"],
                    colorScheme: "main"
                }
            ],
        }        
    })
}