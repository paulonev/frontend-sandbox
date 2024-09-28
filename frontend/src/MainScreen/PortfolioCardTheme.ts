import { Black, Green, PortfolioSecondaryColorScheme, Red, White } from "../Common/colors";

export type PortfolioColorScheme = "main" | PortfolioSecondaryColorScheme;

export type CardSchemeStyles = {
    readonly bgColor: string;
    readonly textColor: string;
    readonly tagsBgColor: string;
    readonly gainColor: string;
    readonly lossColor: string;
}

export type PortfolioCardColorTheme = {
    [key in PortfolioColorScheme]: CardSchemeStyles;
}

export const PortfolioCardTheme: PortfolioCardColorTheme = {
    main: {
        bgColor: "#426AF9",
        textColor: White,
        tagsBgColor: "rgba(255, 255, 255, 0.2)",
        gainColor: "#72FF72",
        lossColor: "#FF7272"
    },
    pattensBlue: {   
        bgColor: "#DCEBFF",
        textColor: Black,
        tagsBgColor: "rgba(255, 255, 255, 0.2)",
        gainColor: Green,
        lossColor: Red,
    },
    bridalHeath: {
        bgColor: "#FFF9EF",
        textColor: Black,
        tagsBgColor: "rgba(255, 255, 255, 0.2)",
        gainColor: Green,
        lossColor: Red,
    },
    pinkLace: {
        bgColor: "#FFE7FA",
        textColor: Black,
        tagsBgColor: "rgba(255, 255, 255, 0.2)",
        gainColor: Green,
        lossColor: Red,
    },
    hintOfGreen: {
        bgColor: "#E1FEE5",
        textColor: Black,
        tagsBgColor: "rgba(255, 255, 255, 0.2)",
        gainColor: Green,
        lossColor: Red,
    },
    springSun: {
        bgColor: "#F8FFDE",
        textColor: Black,
        tagsBgColor: "rgba(255, 255, 255, 0.2)",
        gainColor: Green,
        lossColor: Red,
    },
    blueChalk: {
        bgColor: "#F6E4FF",
        textColor: Black,
        tagsBgColor: "rgba(255, 255, 255, 0.2)",
        gainColor: Green,
        lossColor: Red,
    }
}