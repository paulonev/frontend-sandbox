import styled from "styled-components";
import { PortfolioCardTheme } from "../../MainScreen/PortfolioCardTheme";
import { White } from "../colors";
import React from "react";

type ButtonType = "submit" | "reset" | "button" | undefined;
interface IPrimaryButtonProps {
    readonly type?: ButtonType;
    readonly disabled: boolean;
    readonly onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const PrimaryButton = (props: IPrimaryButtonProps & React.PropsWithChildren): JSX.Element => {
    return <ButtonStyled type={props.type ?? "button"} disabled={props.disabled} onClick={props.onClick}>{props.children}</ButtonStyled>;
}

// [== STYLES ==]
const ButtonStyled = styled.button`
    background-color: ${PortfolioCardTheme.main.bgColor};
    color: ${White};

    width: 91.5vw;

    border-radius: 12.13px;
    height: 40px;
    text-align: center;
    box-sizing: border-box;

    &:disabled {
        background-color: rgba(66, 106, 249, 0.4);
    }
`;