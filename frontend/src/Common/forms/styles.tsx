import styled, { CSSProperties } from "styled-components";
import { Black } from "../colors";

export const LabelStyled = styled.label`
    display: block;
    margin-bottom: 10px;
    color: ${Black};
    font-weight: 500;
    font-size: 14px;
`;

export const LabelStyleRules = {
    display: "block",
    marginBottom: "10px",
    color: Black,
    fontWeight: 500,
    fontSize: "14px"
} as CSSProperties;

export const FormFieldStyled = styled.div`
    margin-bottom: 35px;
`;

export const InputStyled = styled.input.attrs({
    type: "text"
})`
    width: 100%;
    padding: 12.5px 12px;
    border: 1.23px solid rgba(130, 130, 130, 0.1);
    border-radius: 12px;
    box-sizing: border-box;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    color: ${Black};
    font-weight: 400;
    font-family: inherit;
    font-size: 16px;
`;