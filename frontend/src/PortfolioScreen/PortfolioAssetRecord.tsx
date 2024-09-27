import styled from "styled-components";
import { formatPercentage, formatPrice } from "../Common/formatter";
import { AppGlobalCurrencyCode } from "../constants";
import { Black, Green, Red } from "../Common/colors";
import { isGain } from "../MainScreen/types";
import { DifferenceType } from "../Entities/Portfolio/types";
import { PortfolioAsset } from "../Api/portfolio.schema";
import Big from "big.js";

interface IPortfolioAssetRecordProps {
    readonly data: PortfolioAsset;
}

export const PortfolioAssetRecord = ({ data }: IPortfolioAssetRecordProps): JSX.Element => {
    return (
        <ContainerStyled>
            <Div1Styled>{data.fullName}</Div1Styled>
            <Div2Styled>{formatPrice(data.volume.inFiat, AppGlobalCurrencyCode)}</Div2Styled>
            <Div3Styled>{new Big(data.volume.inAmount).toFixed(5).toString()} {data.shortName}</Div3Styled>
            <Div4Styled isGain={isGain(data.gainLoss.type)}>{getPercentageOutput(data.gainLoss.inPercentage, data.gainLoss.type)}</Div4Styled>
            <Div5Styled>
                <ImageContainerStyled>
                    <img src={data.logoUrl ?? ""} style={{ maxWidth: "100%", height: 40, objectFit: "contain" }}/>
                </ImageContainerStyled>
            </Div5Styled>
        </ContainerStyled>
    );
}

function getPercentageOutput (percentage: number, gainLossType: DifferenceType) {
    return isGain(gainLossType) ? `+${formatPercentage(percentage)}` : `-${formatPercentage(percentage)}`;
}

// [== STYLES ==]
const ContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 0.16fr repeat(2, 0.5fr);
    grid-template-rows: repeat(2, 0.1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    color: ${Black};

    @media screen and (min-width: 768px) {
        grid-template-columns: 50px repeat(2, 0.5fr);
    }
`;

const Div1Styled = styled.div`
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    justify-content: flex-start;
    font-size: 16px;
    font-weight: 500;
`;
const Div2Styled = styled.div`
    grid-area: 1 / 3 / 2 / 4;
    display: flex;
    justify-content: flex-end;
    font-size: 18px;
    font-weight: 600;
`;
const Div3Styled = styled.div`
    grid-area: 2 / 2 / 3 / 3;
    display: flex;
    justify-content: flex-start;
    color: #575757;
    font-size: 14px;
`;
const Div4Styled = styled.div<{ isGain: boolean; }>`
    grid-area: 2 / 3 / 3 / 4;
    display: flex;
    justify-content: flex-end;
    font-size: 14px;
    color: ${props => props.isGain ? Green : Red};
`;
const Div5Styled = styled.div`
    grid-area: 1 / 1 / 3 / 2;
    display: flex;
    align-items: center;
`;

const ImageContainerStyled = styled.div`
    max-width: 40px;
    height: 40px;
`