/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { ThemeProvider } from "styled-components";
import { PortfolioItem } from "./types"
import { PrimaryHeaderColor } from "../Common/colors";
import { PortfolioCardWide } from "./PortfolioCardWide";
import { PortfolioCardTheme } from "./PortfolioCardTheme";
import { PortfolioCarousel } from "./PortfolioCarousel";
import { ProvidePortfolioCardType } from "./PortfolioCardTypeProvider";
import { MainScreen } from "./vocabulary";

interface IPortfoliosProps {
    readonly items: PortfolioItem[];
}

export const Portfolios = ({ items }: IPortfoliosProps) => {
    return (
        <ContainerStyled>
            <HeaderStyled>{MainScreen.MainPortfolioRu}</HeaderStyled>
            <ThemeProvider theme={PortfolioCardTheme}>
                {/* TODO: one portfolio is always main */}
                <ProvidePortfolioCardType value={{ type: "large" }}>
                    <PortfolioCardWide item={items.find(p => p.isMain)} />
                </ProvidePortfolioCardType>
                <SecondaryHeaderStyled>{MainScreen.OtherPortfoliosRu}</SecondaryHeaderStyled>
                <ProvidePortfolioCardType value={{ type: "small" }}>
                    <PortfolioCarousel items={items.filter(p => !p.isMain)} />
                </ProvidePortfolioCardType>
            </ThemeProvider>
        </ContainerStyled>
    );
}

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