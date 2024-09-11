import styled from "styled-components";
import { PortfolioVolumePanel } from "./PortfolioVolumePanel";
import { Portfolio } from "./types"
import { PortfolioProfitsPanel } from "./PortfolioProfitsPanel";

interface IPortfolioStatisticsPanelProps {
    readonly data: Portfolio;
}

export const PortfolioStatisticsPanel = ({ data }: IPortfolioStatisticsPanelProps): JSX.Element => {
    return (
        <ContainerStyled>
            <PortfolioVolumePanel data = {{ volume: data.overallVolume, periodProfit: data.gainLossDay }} />
            <PortfolioProfitsPanel data = {{ allTimeProfit: data.gainLossAllTime, bestProfit: data.assets.best, worstProfit: data.assets.worst }} />
        </ContainerStyled>
    );
}

// [== STYLES ==]
const ContainerStyled = styled.div`
    margin-top: 40px;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
`;