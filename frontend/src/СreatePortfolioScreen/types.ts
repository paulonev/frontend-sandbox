import { PortfolioColorScheme } from "../Common/colors";
import { PortfolioType } from "../MainScreen/types";

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