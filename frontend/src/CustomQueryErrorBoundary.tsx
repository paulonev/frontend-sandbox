import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import styled from "styled-components";
import { PortfolioCardTheme } from "./MainScreen/PortfolioCardTheme";
import { White } from "./Common/colors";
import { ApiError } from "./Entities/Errors/ApiError";
import { Vocab } from "./vocabulary";

interface ICustomQueryErrorBoundaryProps {
    readonly reset: () => void;
    readonly Footer?: React.ReactNode;
}

function getFallbackRender({ Footer }: { Footer?: React.ReactNode }) {
    return ({ error, resetErrorBoundary }: FallbackProps) => {        
        return (
            <ScreenStyled>
                <ContainerStyled>
                    <span>{Vocab.GeneralErrorRu}</span>
                    {error instanceof ApiError ? (
                        <>
                            <span>ErrorId: <b>{error.errorId ?? "undefined"}</b></span>
                            {/* TODO: use openTelegramLink() for opening support chat*/}
                            <span>{Vocab.ContactCustomerSupportRu}</span>
                        </>
                    ) : null}
                    {!Footer 
                        ? <ButtonStyled onClick={() => resetErrorBoundary()}>{Vocab.TryAgainLaterRu}</ButtonStyled>
                        : Footer
                    }
                </ContainerStyled>
            </ScreenStyled>
        );
    }
}

export const CustomQueryErrorBoundary = ({ children, reset, Footer }: React.PropsWithChildren & ICustomQueryErrorBoundaryProps): JSX.Element => {
    return (
        <ErrorBoundary
            onReset={reset}
            fallbackRender={getFallbackRender({ Footer })}
        >
            {children}       
        </ErrorBoundary>
    );
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

const ScreenStyled = styled.div`
    position: absolute;
    background-color: ${White};
    height: 100%;
    width: 100%;
    display: block;
`;