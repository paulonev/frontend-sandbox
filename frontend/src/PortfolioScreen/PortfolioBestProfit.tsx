import { PortfolioAssetShortView } from "./types"
import { PortfolioScreen } from "./vocabulary";
import { PortfolioProfitCard } from "./PortfolioProfitCard";

interface IPortfolioBestProfitProps {
    readonly data: PortfolioAssetShortView;
}

export const PortfolioBestProfit = ({ data }: IPortfolioBestProfitProps): JSX.Element => {
    return (
        <PortfolioProfitCard 
            profitType={PortfolioScreen.BestAssetRu}
            data={data}
        />            
    );
}