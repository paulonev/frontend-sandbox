/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import PortfolioVolumePanel from "./PortfolioVolumePanel_skeletoned";
import PortfolioProfitsPanel from "./PortfolioProfitsPanel_skeletoned";

const PortfolioStatisticsPanel_skeletoned = (): JSX.Element => {
    return (
        <ContainerStyled>
            <PortfolioVolumePanel />
            <PortfolioProfitsPanel />
        </ContainerStyled>
    );
}

export default PortfolioStatisticsPanel_skeletoned;

// [== STYLES ==]
const ContainerStyled = styled.div`
    margin-top: 50px;
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;
`;