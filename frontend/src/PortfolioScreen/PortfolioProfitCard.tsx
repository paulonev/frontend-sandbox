import styled from "styled-components";
import { Black, Green, Red } from "../Common/colors";
import { ItemCard } from "../Common/components/ItemCard";
import { formatGainLossWithPercentage } from "../Common/formatter";
import { AppGlobalCurrencyCode } from "../constants";
import { isGain } from "../MainScreen/types";
import { PortfolioAssetShortView } from "./types";

interface IPortfolioProfitCardProps {
    readonly profitType: string;
    readonly data: PortfolioAssetShortView;
}

export const PortfolioProfitCard = ({ data: { gainLoss, fullName, logoUrl }, profitType }: IPortfolioProfitCardProps): JSX.Element => {
    return (
        <ItemCard
            title={profitType}
            titleStyles={{
                fontSize: 10,
                color: Black
            }}
            renderPrimaryText={() => (
                <ContainerStyled>
                    <img src={logoUrl ?? ""} style={{ maxWidth: "100%", height: 22, objectFit: "contain" }} />
                    <span>{fullName}</span>
                </ContainerStyled>
            )}
            renderSecondaryText={() => formatGainLossWithPercentage(gainLoss.inVolume, AppGlobalCurrencyCode, gainLoss.inPercentage, gainLoss.type)}
            primaryParagraphStyles={{
                fontSize: 14,
                color: Black,
                marginTop: 8,
            }}
            secondaryParagraphStyles={{
                fontSize: 8,
                color: isGain(gainLoss.type) 
                ? Green 
                : Red
            }}
            containerStyles={{
                cursor: "none",
                padding: 15,
                paddingBottom: 5
            }}
        />
    );
}

// [== STYLES ==]
const ContainerStyled = styled.div`
    display: flex;
    gap: 5px;
    margin-bottom: 5px;
`;