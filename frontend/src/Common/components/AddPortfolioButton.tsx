import { PortfolioCardTheme } from "../../MainScreen/PortfolioCardTheme";

export const AddPortfolioButton = (): JSX.Element => {
    return (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="20" fill={PortfolioCardTheme.main.bgColor} />
            <path d="M18.397 26V13H20.603V26H18.397ZM13 20.603V18.397H26V20.603H13Z" fill="white"/>
        </svg>
    );
}