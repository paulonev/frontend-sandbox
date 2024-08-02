import styled, { DefaultTheme, useTheme } from "styled-components";
import { PortfolioItem } from "./types";
import { PortfolioCardName } from "./PortfolioCardName";
import { PortfolioCardCurrentMetrics } from "./PortfolioCardCurrentMetrics";
import { PortfolioCardTags } from "./PortfolioCardTags";

interface IPortfolioCardWideProps {
    readonly item: PortfolioItem | undefined;
}

export const PortfolioCardWide = ({ item }: IPortfolioCardWideProps): JSX.Element => {
    const theme = useTheme();

    if (!item)
        return <></>;
    
    return (
        <PortfolioCardStyled theme={theme}>
            <div>
                <PortfolioCardName value={item?.name} colorScheme={item.colorScheme} />
                <PortfolioCardCurrentMetrics gainLoss={item?.meta.gainLoss} totalAmount={item?.meta.volume} colorScheme={item.colorScheme} />
            </div>
            <PortfolioCardTags value={item?.tags} colorScheme={item.colorScheme} />
        </PortfolioCardStyled>
    );
}

// [== STYLES ==]
const PortfolioCardStyled = styled.div<{ theme: DefaultTheme }>`
    background-color: ${props => props.theme.main.bgColor};
    color: ${props => props.theme.main.textColor};

    border-radius: 10px;
    padding: 20px;
    text-align: left;
    width: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
`;