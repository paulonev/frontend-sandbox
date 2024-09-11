import { useQuery } from '@tanstack/react-query';
import { Portfolio } from './types';
import { PortfolioScreenQueryKey } from '../constants';
import bitcoinLogoSvg from '/img/BitcoinLogo.svg';

const MOCK_PORTFOLIOS: Portfolio[] = [{
    id: 1,
    name: "Крипта тест",
    overallVolume: 5672.00,
    gainLossDay: {
        type: "gain",
        inVolume: 56.32,
        inPercentage: 0.0102,
    },
    gainLossAllTime: {
        type: "gain",
        inVolume: 572.20,
        inPercentage: 0.1002,
    },
    balance: {
        volume: 50023.03,
    },
    assets: {
        best: {
            id: 1,
            fullName: "Bitcoin",
            logoUrl: `${bitcoinLogoSvg}`,
            gainLoss: {
                type: "gain",
                inVolume: 5672.00,
                inPercentage: 0.0102,
            }
        },
        worst: {
            id: 2,
            fullName: "Bitcoin",
            logoUrl: `${bitcoinLogoSvg}`,
            gainLoss: {
                type: "loss",
                inVolume: 5672.00,
                inPercentage: 0.0102,
            }
        },
        items: [{
            id: 1,
            fullName: "Bitcoin",
            shortName: "BTC",
            logoUrl: `${bitcoinLogoSvg}`,
            volume: {
                inAmount: 0.235,
                inFiat: 50023.03,
            },
            gainLoss: {
                type: "gain",
                inPercentage: 0.1,
                inVolume: 1111
            }
        },
        {
            id: 1,
            fullName: "Bitcoin",
            shortName: "BTC",
            logoUrl: `${bitcoinLogoSvg}`,
            volume: {
                inAmount: 0.235,
                inFiat: 50023.03,
            },
            gainLoss: {
                type: "gain",
                inPercentage: 0.1,
                inVolume: 1111
            }
        },
        {
            id: 1,
            fullName: "Bitcoin",
            shortName: "BTC",
            logoUrl: `${bitcoinLogoSvg}`,
            volume: {
                inAmount: 0.235,
                inFiat: 50023.03,
            },
            gainLoss: {
                type: "gain",
                inPercentage: 0.1,
                inVolume: 1111
            }
        }]
    },
}];

type UsePortfolioQueryProps = {
    readonly id: number;
}

export const usePortfolioQuery = ({ id }: UsePortfolioQueryProps) => {
    return useQuery<Portfolio>({
        queryKey: [PortfolioScreenQueryKey, id],
        queryFn: () => {
            // TODO: when integrating with PortfolioApi layer
            // write a function that returns a promise that either resolves with data or rejects with any error, like (401, 404, 5xx, ...)
            
            //simulate network delay
            //for the sake of simplicity, always returns first portfolio from the mocked portfolios array
            return new Promise(res => setTimeout(() => {
                res(MOCK_PORTFOLIOS[0]);
            }, 1000));
        },
    })
}