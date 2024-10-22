import React, { useEffect, useRef } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import styled from "styled-components";
import { PortfolioCardTheme } from "./MainScreen/PortfolioCardTheme";
import { Black, White } from "./Common/colors";
import { ApiError } from "./Entities/Errors/ApiError";
import { Vocab } from "./vocabulary";

const POPOVER_TIMEOUT_MS: number = 1500;

interface ICustomQueryErrorBoundaryProps {
    readonly reset: () => void;
    readonly Footer?: React.ReactNode;
}

function getFallbackRender({ Footer }: { Footer?: React.ReactNode }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const popoverRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const triggerBtnRef = useRef<HTMLButtonElement>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const timeoutRef = useRef<number>();

    const copyButtonClicked = async (errorId: string) => {
        await navigator.clipboard.writeText(errorId);
        
        if (popoverRef.current) {
            popoverRef.current.classList.remove("custom-popover-hidden");

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            
            timeoutRef.current = setTimeout(() => {
                popoverRef.current!.classList.add("custom-popover-hidden");
            }, POPOVER_TIMEOUT_MS);
        }
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return ({ error, resetErrorBoundary }: FallbackProps) => {        
        return (
            <ScreenStyled>
                <ContainerStyled>
                    <img src="./img/stone-face.png" />
                    <SomethingWengWrongStyled>{Vocab.GeneralErrorRu}</SomethingWengWrongStyled>
                    {error instanceof ApiError ? (
                        <ErrorInfoContainerStyled>
                            <p style={{ margin: 0, padding: 0 }}>{Vocab.ContactCustomerSupportRu}</p>
                            {error.errorId && (
                                <span>
                                    <InlineInputStyled value={error.errorId} />
                                    <CopyButtonStyled ref={triggerBtnRef} onClick={async() => await copyButtonClicked(error.errorId!)}/>
                                    <div ref={popoverRef} className="custom-popover custom-popover-hidden">
                                        <p style={{ padding: 5, margin: 0 }}>{Vocab.CopiedRu}</p>
                                    </div>
                                    {/* <UncontrolledPopover
                                        placement="top-start"
                                        target="copyToClipboardTrigger"
                                        trigger="focus"
                                        hideArrow
                                    >
                                        <PopoverBody style={{ padding: 5, margin: 0 }}>{Vocab.CopiedRu}</PopoverBody>
                                    </UncontrolledPopover> */}
                                </span>
                            )}
                            {/* TODO: use openTelegramLink() for opening support chat*/}
                        </ErrorInfoContainerStyled>
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
    top: 35vh;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    color: ${Black};
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

const SomethingWengWrongStyled = styled.span`
    margin-top: 15px;
`;

const InlineInputStyled = styled.input.attrs({
    type: "text",
    readOnly: true
})`
    display: inline-block;
    border: none;
    border-bottom: 1px solid black;
    font-weight: 700;
    font-family: "Inter", sans-serif;
    margin-left: 5px;
    text-align: center;
    min-width: 265px;
`;

const CopyButtonStyled = styled.button`
    background-image: url(./img/copy-icon.png);
    background-size: 14px;
    background-color: #fff;
    background-position: 50%;
    background-repeat: no-repeat;
    border: 0;
    display: inline-block;
    height: 30px;
    position: relative;
`;

const ErrorInfoContainerStyled = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    margin-top: 5px;
`;