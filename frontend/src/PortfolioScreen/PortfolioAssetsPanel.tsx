import styled from "styled-components";
import { PortfolioAssets } from "./types"
import { Black } from "../Common/colors";
import { PortfolioScreen } from "./vocabulary";
import { PortfolioAssetRecord } from "./PortfolioAssetRecord";
import { PrimaryButton } from "../Common/components/PrimaryButton";

interface IPortfolioAssetsPanelProps {
    readonly data: PortfolioAssets;
}

export const PortfolioAssetsPanel = ({ data: { items }}: IPortfolioAssetsPanelProps): JSX.Element => {
    return (
        <ContainerStyled>
            <SectionTitleStyled>{PortfolioScreen.TokenAssetsRu}</SectionTitleStyled>
            {items.length ? (
                <PortfolioAssetListStyled>
                    {items.map((x, index) => <PortfolioAssetRecord key={index} data={x} />)}
                </PortfolioAssetListStyled>
            ) : null}
            <ButtonContainerStyled>
                <PrimaryButton disabled={false}>
                    {PortfolioScreen.AddTransactionRu}
                </PrimaryButton>
            </ButtonContainerStyled>
        </ContainerStyled>
    );
}

// [== STYLES ==]
const ContainerStyled = styled.div`
    margin-top: 30px;
`;

const SectionTitleStyled = styled.p`
    font-weight: 500;
    font-size: 14px;
    color: ${Black};
    margin-bottom: 25px;
`;

const PortfolioAssetListStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const ButtonContainerStyled = styled.div`
    margin-top: 25px;
`; 