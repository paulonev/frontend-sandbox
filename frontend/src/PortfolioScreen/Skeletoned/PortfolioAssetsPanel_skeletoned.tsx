/* eslint-disable react-refresh/only-export-components */
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import PortfolioAssetRecord from './PortfolioAssetRecord_skeletoned';

const PortfolioAssetsPanel_skeletoned = (): JSX.Element => {
    return (
        <ContainerStyled>
            <p><Skeleton style={{ width: "30vw" }}/></p>
            <PortfolioAssetListStyled>
                <PortfolioAssetRecord key={0} />
                <PortfolioAssetRecord key={1} />
                <PortfolioAssetRecord key={2} />
            </PortfolioAssetListStyled>
        </ContainerStyled>
    );
}

export default PortfolioAssetsPanel_skeletoned;

// [== STYLES ==]
const ContainerStyled = styled.div`
    margin-top: 30px;
`;

const PortfolioAssetListStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;