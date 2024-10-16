/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import PortfolioProfitCard from "./PortfolioProfitCard_skeletoned";

const PortfolioProfitsPanel_skeletoned = (): JSX.Element => {
    return (
        <ContainerStyled>
            <PortfolioProfitCard key={0} />
            <PortfolioProfitCard key={1} />
            <PortfolioProfitCard key={2} />
        </ContainerStyled>
    );
}

export default PortfolioProfitsPanel_skeletoned;

// [== STYLES ==]
const ContainerStyled = styled.div`
    margin-top: 35px;
    margin-bottom: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    justify-content: space-between;
`;