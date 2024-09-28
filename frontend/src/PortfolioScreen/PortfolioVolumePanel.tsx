import styled from "styled-components";
import { formatPrice, formatGainLossWithPercentage } from "../Common/formatter";
import { PortfolioDifference } from "../Entities/Portfolio/types";
import { isPositiveNumber } from "../MainScreen/utils";
import { Black, Green, Red } from "../Common/colors";
import { AppGlobalCurrencyCode } from "../constants";
import { PortfolioScreen } from "./vocabulary";

interface IPortfolioVolumePanelProps {
    data: {
        readonly volume: number;
        readonly periodProfit: PortfolioDifference;
    }; 
    readonly currency?: string;
}

export const PortfolioVolumePanel = ({ data, currency = AppGlobalCurrencyCode }: IPortfolioVolumePanelProps): JSX.Element => {
    return (
        <>
            <MainParagraphStyled>
                {formatPrice(data.volume, currency)}
            </MainParagraphStyled>
            <SecondaryParagraphStyled $isGain={isPositiveNumber(data.periodProfit.inVolume)}>
                {formatGainLossWithPercentage(data.periodProfit.inVolume, currency, data.periodProfit.inPercentage)} - 24{PortfolioScreen.HourShortLabelRu}
            </SecondaryParagraphStyled>
        </>
    )
}

// [== STYLES ==]
const MainParagraphStyled = styled.p`
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 600;
    font-size: 40px;
    color: ${Black};
    text-align: center;
`;

const SecondaryParagraphStyled = styled.p<{$isGain: boolean;}>`
    margin-top: 0;
    margin-bottom: 10px;
    font-weight: 500;
    font-size: 16px;
    color: ${props => props.$isGain ? Green : Red};
    text-align: center;
`;