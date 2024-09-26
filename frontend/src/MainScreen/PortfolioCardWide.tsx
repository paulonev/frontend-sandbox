import { useTheme } from "styled-components";
import { isGain } from "./types";
import { ItemCard } from "../Common/components/ItemCard";
import { formatPrice, formatGainLossWithPercentage } from "../Common/formatter";
import { AppGlobalCurrencyCode } from "../constants";
import { usePortfolioCardType } from "./PortfolioCardTypeProvider";
import { PortfolioCardTags } from "./PortfolioCardTags";
import { PortfolioItem } from "../Api/portfolios.schema";

interface IPortfolioCardWideProps {
    readonly item: PortfolioItem | undefined;
    readonly onClick: (item: PortfolioItem) => void;
}

export const PortfolioCardWide = ({ item, onClick }: IPortfolioCardWideProps): JSX.Element => {
    const theme = useTheme();
    const { type } = usePortfolioCardType();

    if (!item)
        return <></>;
    
    return (
        <ItemCard
            title={item.name}
            onBoxClick={() => onClick(item)}
            containerStyles={{
                width: "auto",
                color: theme.main.textColor,
                backgroundColor: theme.main.bgColor
            }}
            titleStyles={{
                color: item.colorScheme ? theme[item.colorScheme].textColor : theme.card_default.textColor,
            }}
            primaryParagraphStyles={{
                fontSize: type === "small" ? "22px" : "30px",
                color: item.colorScheme ? theme[item.colorScheme].textColor : theme.card_default.textColor
            }}
            secondaryParagraphStyles={{
                fontSize: type === "small" ? "12px" : "14px",
                color: isGain(item.meta.gainLoss.type) 
                        ? item.colorScheme ? theme[item.colorScheme].gainColor : theme.card_default.gainColor 
                        : item.colorScheme ? theme[item.colorScheme].lossColor : theme.card_default.lossColor
            }}
            renderPrimaryText={() => formatPrice(item.meta?.volume, AppGlobalCurrencyCode)}
            renderSecondaryText={() => formatGainLossWithPercentage(item.meta?.gainLoss?.inVolume, AppGlobalCurrencyCode, item.meta?.gainLoss?.inPercentage)}
            Footer={() => <PortfolioCardTags value={item?.tags} colorScheme={item.colorScheme} />}
        />
    );
}