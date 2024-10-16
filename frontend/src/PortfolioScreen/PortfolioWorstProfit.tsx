import { PortfolioScreen } from "./vocabulary";
import { PortfolioProfitCard } from "./PortfolioProfitCard";
import { PortfolioAssetShortView } from "../Api/portfolio.schema";

interface IPortfolioWorstProfitProps {
    readonly data: PortfolioAssetShortView | null;
}

export const PortfolioWorstProfit = ({ data }: IPortfolioWorstProfitProps): JSX.Element => {
    return (
        <PortfolioProfitCard 
            profitType={PortfolioScreen.WorstAssetRu}
            data={data}
        />            
    );
}