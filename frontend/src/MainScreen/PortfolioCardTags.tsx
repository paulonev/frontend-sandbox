import styled, { DefaultTheme, useTheme } from "styled-components";

interface IPortfolioCardTagsProps {
    readonly value: string[] | undefined;
    readonly colorScheme?: string;
}

export const PortfolioCardTags = ({ value, colorScheme }: IPortfolioCardTagsProps): JSX.Element | undefined => {
    const theme = useTheme();

    if (!value)
        return undefined;

    return (
        <TagsContainerStyled>
            {value.map((tag, i) => (<TagStyled key={i} colorScheme={colorScheme} theme={theme} disabled>{tag}</TagStyled>))}
        </TagsContainerStyled>
    );
}

// [== STYLES ==]
const TagsContainerStyled = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const TagStyled = styled.button<{ colorScheme?: string; theme: DefaultTheme }>`
    background-color: ${props => props.colorScheme ? props.theme[props.colorScheme].tagsBgColor : props.theme.default.tagsBgColor};
    color: ${props => props.colorScheme ? props.theme[props.colorScheme].textColor : props.theme.default.textColor};
    
    border: none;
    border-radius: 10px;
    padding: 10px;
    font-size: 14px;
    font-weight: 400;
    align-self: flex-end;
`;