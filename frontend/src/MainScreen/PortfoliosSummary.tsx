/* eslint-disable @typescript-eslint/no-unused-vars */
import { MainScreen } from './vocabulary';
import { formatGainLoss, formatPrice } from '../Common/formatter';
import styled from 'styled-components';
import { Green, SecondaryHeaderColor } from '../Common/colors';
import { DifferenceType, isGain, PortfolioDifference } from './types';
import { AppGlobalCurrencyCode } from '../constants';

interface IPortfoliosSummary {
    readonly totalAmount: number;
    readonly difference: PortfolioDifference;
    readonly currency?: string;
}

export const PortfoliosSummary = ({
    totalAmount,
    difference,
    currency = AppGlobalCurrencyCode
}: IPortfoliosSummary): JSX.Element => {
    return (
        <SectionStyled>
            <HeaderStyled>{MainScreen.OverallVolumeRu}</HeaderStyled>
            <ContentStyled>
                <TotalAmountStyled>{formatPrice(totalAmount, currency)}</TotalAmountStyled>
                <GainLossAmountStyled $type={difference.type}>
                    {formatGainLoss(difference.inVolume, currency, difference.inPercentage, difference.type)}
                </GainLossAmountStyled>
            </ContentStyled>
        </SectionStyled>
    )
}

/// [==Styles==]
// Disclaimer: all styles are constructed for mobile now
const SectionStyled = styled.div`
    margin: 20px 20px 0;
`;

const HeaderStyled = styled.div`
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: ${_ => SecondaryHeaderColor};
`;

const ContentStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
`;

const TotalAmountStyled = styled.div`
    font-family: "Inter", sans-serif;
    font-weight: 800;
    font-size: 20px;
`;

const GainLossAmountStyled = styled.div<{ $type: DifferenceType; }>`
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: ${props => isGain(props.$type) ? Green : "red"};
`;