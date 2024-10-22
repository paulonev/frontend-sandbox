import { PortfolioSecondaryColorScheme } from "../Common/colors";

export type PortfolioType = "Crypto" | "Stocks";

export type NewPortfolioFormData = {
    name: string;
    portfolioType: PortfolioType;
    isMainPortfolio: boolean;
    portfolioColor: PortfolioSecondaryColorScheme | "";
};

export const defaultValues: NewPortfolioFormData = {
    name: "",
    portfolioType: "Crypto",
    isMainPortfolio: false,
    portfolioColor: ""
}