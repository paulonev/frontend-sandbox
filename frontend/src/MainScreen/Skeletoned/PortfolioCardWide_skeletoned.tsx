/* eslint-disable react-refresh/only-export-components */
import styled, { DefaultTheme, useTheme } from "styled-components";
import PortfolioCardName from './PortfolioCardName_skeletoned';
import PortfolioCardCurrentMetrics from "./PortfolioCardCurrentMetrics_skeletoned";
import PortfolioCardTags from './PortfolioCardTags_skeletoned';

const PortfolioCardWide_skeletoned = (): JSX.Element => {
    const theme = useTheme();

    return (
        <PortfolioCardStyled theme={theme}>
            <div>
                <PortfolioCardName />
                <PortfolioCardCurrentMetrics />
            </div>
            <PortfolioCardTags />
        </PortfolioCardStyled>
    );
}

export default PortfolioCardWide_skeletoned;

// [== STYLES ==]
const PortfolioCardStyled = styled.div<{ theme: DefaultTheme }>`
    background-color: ${props => props.theme.card_default.bgColor};
    color: ${props => props.theme.card_default.textColor};

    border-radius: 10px;
    padding: 20px;
    text-align: left;
    width: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
`;