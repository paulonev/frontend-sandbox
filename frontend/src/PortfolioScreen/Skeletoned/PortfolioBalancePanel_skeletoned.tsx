/* eslint-disable react-refresh/only-export-components */
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const PortfolioBalancePanel_skeletoned = (): JSX.Element => {
    return (
        <ContainerStyled>
            <div>
                <Skeleton style={{ width: "30vw" }}/>
            </div>
            <div>
                <Skeleton style={{ lineHeight: 1.5, width: "70vw" }}/>
            </div>
        </ContainerStyled>
    );
}

export default PortfolioBalancePanel_skeletoned;

// [== STYLES ==]
const ContainerStyled = styled.div`
    margin-top: 40px;
    display: flex;
    gap: 20px;
    flex-direction: column;
`;