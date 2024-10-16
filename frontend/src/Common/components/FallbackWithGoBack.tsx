import styled from "styled-components";
import { PortfolioCardTheme } from "../../MainScreen/PortfolioCardTheme";
import { White } from "../colors";
import { useErrorBoundary } from "react-error-boundary";

const Vocab = {
    GoBackButtonTextRu: "Вернуться назад"
};

export const FallbackWithGoBackButton = ({ onClick }: { onClick: () => void; }): JSX.Element => {
    const { resetBoundary } = useErrorBoundary();
    
    const onClickInner = () => {
        onClick();
        resetBoundary();
    }

    return <ButtonStyled onClick={onClickInner}>{Vocab.GoBackButtonTextRu}</ButtonStyled>;
}

const ButtonStyled = styled.button`
    background-color: ${PortfolioCardTheme.main.bgColor};
    color: ${White};

    border-radius: 12.13px;
    text-align: center;
    box-sizing: border-box;

    margin-top: 10px;
`;