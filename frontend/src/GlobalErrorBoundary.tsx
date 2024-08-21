import { ErrorBoundary } from "react-error-boundary"
import { Vocab } from "./СreatePortfolioScreen/vocabulary"
import styled from "styled-components";
import { White } from "./Common/colors";
import { PortfolioCardTheme } from "./MainScreen/PortfolioCardTheme";

interface IGlobalErrorBoundaryProps {
    readonly reset: () => void;
}

export const GlobalErrorBoundary = (props: React.PropsWithChildren & IGlobalErrorBoundaryProps): JSX.Element => {
    return (
        <ErrorBoundary
            onReset={props.reset}
            fallbackRender={({ resetErrorBoundary }) => (
                <ContainerStyled>
                    {Vocab.GeneralErrorRu}
                    <ButtonStyled onClick={() => resetErrorBoundary()}>{Vocab.TryAgainButtonTextRu}</ButtonStyled>
                </ContainerStyled>
            )}
        >
            {props.children}       
        </ErrorBoundary>
    )
}

// [=== STYLES ===]
const ContainerStyled = styled.div`
    position: relative;
    top: 45vh;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`;

const ButtonStyled = styled.button`
    background-color: ${PortfolioCardTheme.main.bgColor};
    color: ${White};

    border-radius: 12.13px;
    text-align: center;
    box-sizing: border-box;

    margin-top: 10px;
`;
