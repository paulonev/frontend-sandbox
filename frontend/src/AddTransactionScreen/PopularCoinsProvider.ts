import { createContext, useContext } from 'react';
import { CoinOptions } from './types';

const PopularCoinsContext = createContext<CoinOptions | undefined>(undefined);

export const ProvidePopularCoins = PopularCoinsContext.Provider;

export const usePopularCoins = () => {
    const context = useContext(PopularCoinsContext);

    return context;
}