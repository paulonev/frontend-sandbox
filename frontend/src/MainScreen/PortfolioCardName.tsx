import styled, { DefaultTheme, useTheme } from "styled-components";

interface IPortfolioCardNameProps {
    readonly value: string | undefined;
    readonly colorScheme?: string;
}

export const PortfolioCardName = ({ value, colorScheme }: IPortfolioCardNameProps) => {
    const theme = useTheme();

    return <ParagraphStyled colorScheme={colorScheme} theme={theme}>{value}</ParagraphStyled>;
}

// [== STYLES ==]
const ParagraphStyled = styled.p<{ colorScheme?: string; theme: DefaultTheme }>`
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 16px;
    margin: 0;

    color: ${props => props.colorScheme ? props.theme[props.colorScheme].textColor : props.theme.card_default.textColor};
`;