import styled from "styled-components";
import { PortfolioDifference } from "../Entities/Portfolio/types"
import { PortfolioAllTimeProfit } from "./PortfolioAllTimeProfit";
import { PortfolioBestProfit } from "./PortfolioBestProfit";
import { PortfolioWorstProfit } from "./PortfolioWorstProfit";
import { PortfolioAssetShortView } from "../Api/portfolio.schema";

interface IPortfolioProfitsPanelProps {
    data: {
        readonly allTimeProfit: PortfolioDifference;
        readonly bestProfit: PortfolioAssetShortView | null;
        readonly worstProfit: PortfolioAssetShortView | null;
    }
}

export const PortfolioProfitsPanel = ({ data }: IPortfolioProfitsPanelProps): JSX.Element => {
    return (
        <ContainerStyled>
            <PortfolioAllTimeProfit data={data.allTimeProfit} />
            <PortfolioBestProfit data={data.bestProfit} />
            <PortfolioWorstProfit data={data.worstProfit} />
        </ContainerStyled>
    );
}

// [== STYLES ==]
const ContainerStyled = styled.div`
    margin-top: 35px;
    margin-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    justify-content: space-between;
`;