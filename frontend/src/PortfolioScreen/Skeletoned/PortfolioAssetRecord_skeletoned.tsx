/* eslint-disable react-refresh/only-export-components */
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const PortfolioAssetRecord_skeletoned = (): JSX.Element => {
    return (
        <ContainerStyled>
            <Div1Styled>
                <Skeleton style={{ width: "90%",  height: "40px" }} />
            </Div1Styled>
            <Div2Styled>
                <Skeleton style={{ width: "90%", height: "40px" }} />
            </Div2Styled>
            <Div5Styled>
                <Skeleton style={{ width: "90%", height: "40px" }} />
            </Div5Styled>
        </ContainerStyled>
    );
}

export default PortfolioAssetRecord_skeletoned;

// [== STYLES ==]
const ContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 0.16fr repeat(2, 0.5fr);
    grid-template-rows: 0.2fr;
    grid-column-gap: 5px;
    grid-row-gap: 0px;
`;

const Div1Styled = styled.div`
    grid-area: 1 / 2 / 2 / 3;
    font-size: 16px;
    font-weight: 500;
`;
const Div2Styled = styled.div`
    grid-area: 1 / 3 / 2 / 4;
    font-size: 18px;
    font-weight: 600;
`;
const Div5Styled = styled.div`
    grid-area: 1 / 1 / 2 / 2;
`;
