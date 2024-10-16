import { createContext, useContext } from 'react';

export interface IPremiumFeatures {
    readonly shouldCheckUnlimitedPortfolios: boolean;
}

const PremiumFeaturesContext = createContext<IPremiumFeatures>({
    shouldCheckUnlimitedPortfolios: false
});

export const ProvidePremiumFeatures = PremiumFeaturesContext.Provider;

export const useUnlimitedPortfoliosViolationCheck = (): ({ violated: (isPremium: boolean) => boolean }) => {
    const { shouldCheckUnlimitedPortfolios } = useContext(PremiumFeaturesContext);

    return { violated: (isPremium: boolean) => !isPremium && shouldCheckUnlimitedPortfolios }
}