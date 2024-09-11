import { Black, Green, Red } from "../Common/colors";
import { ItemCard } from "../Common/components/ItemCard";
import { formatGainLoss, formatPercentage } from "../Common/formatter";
import { AppGlobalCurrencyCode } from "../constants";
import { PortfolioDifference } from "../Entities/Portfolio/types"
import { isGain } from "../MainScreen/types";
import { PortfolioScreen } from "./vocabulary";

interface IPortfolioAllTimeProfitProps {
    readonly data: PortfolioDifference;
}

export const PortfolioAllTimeProfit = ({ data }: IPortfolioAllTimeProfitProps): JSX.Element => {
    return (
        <ItemCard
            title={PortfolioScreen.AllTimeRu}
            titleStyles={{
                fontSize: 10,
                color: Black
            }}
            renderPrimaryText={() => formatGainLoss(data.inVolume, AppGlobalCurrencyCode, data.type)}
            renderSecondaryText={() => formatPercentage(data.inPercentage)}
            primaryParagraphStyles={{
                marginTop: 15,
                fontSize: 14,
                color: isGain(data.type) 
                        ? Green 
                        : Red
            }}
            secondaryParagraphStyles={{
                fontSize: 8,
                color: "#575757"
            }}
            containerStyles={{
                cursor: "none",
                padding: 15,
                paddingBottom: 5,
                width: "31.8%"
            }}

        />
    );
}