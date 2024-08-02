import { createContext, useContext } from 'react';

export interface IPortfolioCardType {
    readonly type: "small" | "large";
}

const PortfolioCardTypeContext = createContext<IPortfolioCardType>({
    type: "large"
});

export const ProvidePortfolioCardType = PortfolioCardTypeContext.Provider;

export const usePortfolioCardType = () => useContext(PortfolioCardTypeContext);