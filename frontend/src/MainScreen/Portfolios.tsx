/* eslint-disable @typescript-eslint/no-unused-vars */
import styled, { ThemeProvider } from "styled-components";
import { PrimaryHeaderColor } from "../Common/colors";
import { PortfolioCardWide } from "./PortfolioCardWide";
import { PortfolioCardTheme } from "./PortfolioCardTheme";
import { PortfolioCarousel } from "./PortfolioCarousel";
import { ProvidePortfolioCardType } from "./PortfolioCardTypeProvider";
import { MainScreen } from "./vocabulary";
import { ProvidePremiumFeatures } from "../PremiumFeatures/PremiumFeaturesProvider";
import { PortfolioItem } from "../Api/portfolios.schema";

interface IPortfoliosProps {
    readonly items: PortfolioItem[];
    readonly selectPortfolio: (id: number) => void;
}

export const Portfolios = ({ items, selectPortfolio }: IPortfoliosProps) => {
    return (
        <ProvidePremiumFeatures value={{ shouldCheckUnlimitedPortfolios: items.length >= 3 }}>
            <ContainerStyled>
                <HeaderStyled>{MainScreen.MainPortfolioRu}</HeaderStyled>
                <ThemeProvider theme={PortfolioCardTheme}>
                    <ProvidePortfolioCardType value={{ type: "large" }}>
                        <PortfolioCardWide item={items.find(p => p.isMain)} onClick={(item) => selectPortfolio(item.id)}/>
                    </ProvidePortfolioCardType>
                    <SecondaryHeaderStyled>{MainScreen.OtherPortfoliosRu}</SecondaryHeaderStyled>
                    <ProvidePortfolioCardType value={{ type: "small" }}>
                        <PortfolioCarousel items={items.filter(p => !p.isMain)} selectPortfolio={(item) => selectPortfolio(item.id)} />
                    </ProvidePortfolioCardType>
                </ThemeProvider>
            </ContainerStyled>
        </ProvidePremiumFeatures>
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