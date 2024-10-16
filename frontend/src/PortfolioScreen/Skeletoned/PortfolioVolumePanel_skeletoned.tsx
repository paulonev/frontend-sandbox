/* eslint-disable react-refresh/only-export-components */
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const PortfolioVolumePanel_skeletoned = (): JSX.Element => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <ContainerStyled style={{ alignItems: "center" }}>
                <Skeleton style={{ lineHeight: 3.5, width: "50vw" }}/>
            </ContainerStyled>
            <ContainerStyled style={{ alignItems: "center" }}>
                <Skeleton style={{ lineHeight: 1.5, width: "40vw" }}/>
            </ContainerStyled>
        </div>
    )
}
export default PortfolioVolumePanel_skeletoned;

const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
`;