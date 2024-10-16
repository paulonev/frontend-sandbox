import { useTheme } from "styled-components";
import { isPositiveNumber } from "./utils";
import { ItemCard } from "../Common/components/ItemCard";
import { formatPrice, formatGainLossWithPercentage } from "../Common/formatter";
import { AppGlobalCurrencyCode } from "../constants";
import { usePortfolioCardType } from "./PortfolioCardTypeProvider";
import { PortfolioItem } from "../Api/portfolios.schema";

interface IPortfolioCardProps {
    readonly item: PortfolioItem | undefined;
    readonly onClick: (item: PortfolioItem) => void;
}

export const PortfolioCard = ({ item, onClick }: IPortfolioCardProps) => {
    const theme = useTheme();
    const { type } = usePortfolioCardType();

    if (!item)
        return <></>;
    
    return (
        <ItemCard
            title={item.name}
            onBoxClick={() => onClick(item)}
            containerStyles={{
                minWidth: 160,
                color: item.colorScheme ? theme[item.colorScheme].textColor : theme.card_default.textColor,
                backgroundColor: item.colorScheme ? theme[item.colorScheme].bgColor : theme.card_default.bgColor
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
                color: isPositiveNumber(item.meta.gainLoss.inPercentage) 
                        ? item.colorScheme ? theme[item.colorScheme].gainColor : theme.card_default.gainColor 
                        : item.colorScheme ? theme[item.colorScheme].lossColor : theme.card_default.lossColor
            }}
            renderPrimaryText={() => formatPrice(item.meta?.volume, AppGlobalCurrencyCode)}
            renderSecondaryText={() => formatGainLossWithPercentage(item.meta?.gainLoss?.inVolume, AppGlobalCurrencyCode, item.meta?.gainLoss?.inPercentage)}
        />
    );
}