/* eslint-disable react-refresh/only-export-components */
import styled, { DefaultTheme, useTheme } from "styled-components";
import PortfolioCardName from './PortfolioCardName_skeletoned';
import PortfolioCardCurrentMetrics from './PortfolioCardCurrentMetrics_skeletoned';

const PortfolioCard_skeletoned = (): JSX.Element => {
    const theme = useTheme();

    return (
        <PortfolioCardStyled theme={theme}>
            <div>
                <PortfolioCardName />
                <PortfolioCardCurrentMetrics />
            </div>
        </PortfolioCardStyled>
    );
}

export default PortfolioCard_skeletoned;

// [== STYLES ==]
const PortfolioCardStyled = styled.div<{ theme: DefaultTheme }>`
    background-color: ${props => props.theme.card_default.bgColor};
    color: ${props => props.theme.card_default.textColor};

    border-radius: 10px;
    padding: 20px;
    text-align: left;
    min-width: 160px;
    flex: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    scroll-snap-align: start;
    box-sizing: border-box;
`;