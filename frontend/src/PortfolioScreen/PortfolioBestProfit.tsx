import { PortfolioScreen } from "./vocabulary";
import { PortfolioProfitCard } from "./PortfolioProfitCard";
import { PortfolioAssetShortView } from "../Api/portfolio.schema";

interface IPortfolioBestProfitProps {
    readonly data: PortfolioAssetShortView | null;
}

export const PortfolioBestProfit = ({ data }: IPortfolioBestProfitProps): JSX.Element => {
    return (
        <PortfolioProfitCard 
            profitType={PortfolioScreen.BestAssetRu}
            data={data}
        />            
    );
}