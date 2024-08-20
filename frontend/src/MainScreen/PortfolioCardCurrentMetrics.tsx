import styled, { DefaultTheme, useTheme } from "styled-components";
import { isGain, PortfolioDifference } from "./types"
import { formatGainLoss, formatPrice } from "../Common/formatter";
import { usePortfolioCardType } from "./PortfolioCardTypeProvider";
import { AppGlobalCurrencyCode } from "../constants";

interface IPortfolioCardCurrentMetricsProps {
    readonly gainLoss: PortfolioDifference;
    readonly totalAmount: number;
    readonly currency?: string;
    readonly colorScheme?: string;
}

export const PortfolioCardCurrentMetrics = ({ gainLoss, totalAmount, currency = AppGlobalCurrencyCode, colorScheme }: IPortfolioCardCurrentMetricsProps) => {
    const theme = useTheme();
    const { type } = usePortfolioCardType();

    return (
        <>
            <MainParagraphStyled colorScheme={colorScheme} theme={theme} type={type}>
                {formatPrice(totalAmount, currency)}
            </MainParagraphStyled>
            <SecondaryParagraphStyled isGain={isGain(gainLoss.type)} theme={theme} type={type} colorScheme={colorScheme}>
                {formatGainLoss(gainLoss.inVolume, currency, gainLoss.inPercentage, gainLoss.type)}
            </SecondaryParagraphStyled>
        </>
    )
}

// [== STYLES ==]
const MainParagraphStyled = styled.p<{ theme: DefaultTheme; colorScheme?: string; type: string}>`
    margin-top: 10px;
    margin-bottom: 0;
    font-weight: 600;
    font-size: ${props => props.type === "small" ? "22px" : "30px"};
    color: ${props => props.colorScheme ? props.theme[props.colorScheme].textColor : props.theme.card_default.textColor };
`;

const SecondaryParagraphStyled = styled.p<{ theme: DefaultTheme; isGain: boolean; type: string; colorScheme?: string;}>`
    margin-top: 0;
    margin-bottom: 10px;
    font-weight: 500;
    font-size: ${props => props.type === "small" ? "12px" : "14px"};
    color: ${props => props.isGain 
            ? props.colorScheme ? props.theme[props.colorScheme].gainColor : props.theme.card_default.gainColor 
            : props.colorScheme ? props.theme[props.colorScheme].lossColor : props.theme.card_default.lossColor};
`;