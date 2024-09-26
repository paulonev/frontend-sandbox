import { PortfolioColorScheme } from "../Common/colors";

export type PortfolioType = "Crypto" | "Stocks";

export type NewPortfolioFormData = {
    name: string;
    portfolioType: PortfolioType;
    isMainPortfolio: boolean;
    portfolioColor: PortfolioColorScheme | "";
};

export const defaultValues: NewPortfolioFormData = {
    name: "",
    portfolioType: "Crypto",
    isMainPortfolio: false,
    portfolioColor: ""
}