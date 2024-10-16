/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { ThemeProvider } from "styled-components";
import { MainScreen } from "../vocabulary";
import { PortfolioCardTheme } from "../PortfolioCardTheme";
import { ProvidePortfolioCardType } from "../PortfolioCardTypeProvider";
import PortfolioCardWide from './PortfolioCardWide_skeletoned';
import PortfolioCarousel from './PortfolioCarousel_skeletoned';
import { PrimaryHeaderColor } from "../../Common/colors";

const Portfolios_skeletoned = (): JSX.Element => {
    return (
        <ContainerStyled>
            <HeaderStyled>{MainScreen.MainPortfolioRu}</HeaderStyled>
            <ThemeProvider theme={PortfolioCardTheme}>
                <ProvidePortfolioCardType value={{ type: "large" }}>
                    <PortfolioCardWide />
                </ProvidePortfolioCardType>
                <SecondaryHeaderStyled>{MainScreen.OtherPortfoliosRu}</SecondaryHeaderStyled>
                <ProvidePortfolioCardType value={{ type: "small" }}>
                    <PortfolioCarousel />
                </ProvidePortfolioCardType>
            </ThemeProvider>
        </ContainerStyled>
    );
}

export default Portfolios_skeletoned;

// [== STYLES ==]
const ContainerStyled = styled.div`
    margin: 20px 20px 0;
`;

const HeaderStyled = styled.div`
    font-weight: 600;
    font-size: 16px;
    color: ${_ => PrimaryHeaderColor};
    margin-bottom: 12px;
`;

const SecondaryHeaderStyled = styled.div`
    font-weight: 600;
    font-size: 14px;
    color: ${_ => PrimaryHeaderColor};
    margin-bottom: 18px;
    margin-top: 30px;
`;