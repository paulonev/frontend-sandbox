import styled, { DefaultTheme, useTheme } from "styled-components";
import { PortfolioItem } from "./types";
import { PortfolioCardName } from "./PortfolioCardName";
import { PortfolioCardCurrentMetrics } from "./PortfolioCardCurrentMetrics";

interface IPortfolioCardProps {
    readonly item: PortfolioItem | undefined;
}

export const PortfolioCard = ({ item }: IPortfolioCardProps) => {
    const theme = useTheme();

    if (!item)
        return <></>;
    
    return (
        <PortfolioCardStyled colorScheme={item.colorScheme} theme={theme}>
            <div>
                <PortfolioCardName value={item?.name} colorScheme={item.colorScheme} />
                <PortfolioCardCurrentMetrics gainLoss={item?.meta.gainLoss} totalAmount={item?.meta.volume} colorScheme={item.colorScheme} />
            </div>
        </PortfolioCardStyled>
    );
}

// [== STYLES ==]
const PortfolioCardStyled = styled.div<{ colorScheme?: string; theme: DefaultTheme }>`
    background-color: ${props => props.colorScheme ? props.theme[props.colorScheme].bgColor : props.theme.card_default.bgColor};
    color: ${props => props.colorScheme ? props.theme[props.colorScheme].textColor : props.theme.card_default.textColor};

    border-radius: 10px;
    padding: 20px;
    text-align: left;
    min-width: 160px;
    flex: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    scroll-snap-align: start;
    box-sizing: border-box;
`;