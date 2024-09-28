import styled from "styled-components";
import { Black, Green, Red } from "../Common/colors";
import { ItemCard } from "../Common/components/ItemCard";
import { formatGainLossWithPercentage } from "../Common/formatter";
import { AppGlobalCurrencyCode } from "../constants";
import { isPositiveNumber } from "../MainScreen/utils";
import { PortfolioAssetShortView } from "../Api/portfolio.schema";

interface IPortfolioProfitCardProps {
    readonly profitType: string;
    readonly data: PortfolioAssetShortView | null;
}

export const PortfolioProfitCard = ({ data, profitType }: IPortfolioProfitCardProps): JSX.Element => {
    // when data is null, it means that no transactions were added to the portfolio 
    // we'll show specific screen for that later 
    if (data === null) {
        return <></>;
    }

    const { gainLoss, fullName, logoUrl } = data;

    return (
        <ItemCard
            title={profitType}
            titleStyles={{
                fontSize: 12,
                color: Black
            }}
            renderPrimaryText={() => (
                <ContainerStyled>
                    <img src={logoUrl ?? ""} style={{ maxWidth: "100%", height: 22, objectFit: "contain" }} />
                    <span>{fullName}</span>
                </ContainerStyled>
            )}
            renderSecondaryText={() => formatGainLossWithPercentage(gainLoss.inVolume, AppGlobalCurrencyCode, gainLoss.inPercentage)}
            primaryParagraphStyles={{
                fontSize: 14,
                color: Black,
                marginTop: 8,
                fontWeight: 500
            }}
            secondaryParagraphStyles={{
                fontSize: 9,
                color: isPositiveNumber(gainLoss.inPercentage) 
                    ? Green 
                    : Red
            }}
            containerStyles={{
                cursor: "unset",
                padding: 10,
                paddingBottom: 5,
                width: "31.8%",
                backgroundColor: "#fff"
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