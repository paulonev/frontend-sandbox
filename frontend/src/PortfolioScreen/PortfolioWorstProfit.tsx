import { PortfolioAssetShortView } from "./types"
import { PortfolioScreen } from "./vocabulary";
import { PortfolioProfitCard } from "./PortfolioProfitCard";

interface IPortfolioWorstProfitProps {
    readonly data: PortfolioAssetShortView;
}

export const PortfolioWorstProfit = ({ data }: IPortfolioWorstProfitProps): JSX.Element => {
    return (
        <PortfolioProfitCard 
            profitType={PortfolioScreen.WorstAssetRu}
            data={data}
        />            
    );
}