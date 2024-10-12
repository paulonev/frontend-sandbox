import { useEffect, useState } from "react";
import { Black, Green, Red } from "../Common/colors";
import { ItemCard } from "../Common/components/ItemCard";
import { formatGainLoss, formatPercentage } from "../Common/formatter";
import { AppGlobalCurrencyCode } from "../constants";
import { PortfolioDifference } from "../Entities/Portfolio/types"
import { isPositiveNumber } from "../MainScreen/utils";
import { PortfolioScreen } from "./vocabulary";

interface IPortfolioAllTimeProfitProps {
    readonly data: PortfolioDifference;
}

export const PortfolioAllTimeProfit = ({ data }: IPortfolioAllTimeProfitProps): JSX.Element => {
    const [isLess560Screen, setIsLess560Screen] = useState(false);

    //TODO: find a way to use native stylesheet overrides as props to component
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 560px)');
        setIsLess560Screen(mediaQuery.matches);

        const handleMediaChange = () => setIsLess560Screen(mediaQuery.matches);
        mediaQuery.addListener(handleMediaChange);
        
        return () => mediaQuery.removeListener(handleMediaChange);
    }, []);

    return (
        <ItemCard
            title={PortfolioScreen.AllTimeRu}
            titleStyles={{
                fontSize: 12,
                color: Black
            }}
            renderPrimaryText={() => formatGainLoss(data.inVolume, AppGlobalCurrencyCode)}
            renderSecondaryText={() => formatPercentage(data.inPercentage)}
            primaryParagraphStyles={{
                marginTop: 11,
                fontSize: isLess560Screen ? 12 : 16,
                color: isPositiveNumber(data.inVolume) 
                        ? Green 
                        : Red
            }}
            secondaryParagraphStyles={{
                fontSize: isLess560Screen ? 10 : 11,
                color: "#575757"
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