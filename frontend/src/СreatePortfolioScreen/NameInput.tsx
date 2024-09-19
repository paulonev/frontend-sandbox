import { Vocab } from "./vocabulary";
import { FieldError, UseFormRegister } from "react-hook-form";
import { NewPortfolioFormData } from "./types";
import { FormFieldStyled, InputStyled, LabelStyled } from "../Common/forms/styles";
import { Red } from "../Common/colors";
import styled from "styled-components";

interface INameInputProps {
    readonly register: UseFormRegister<NewPortfolioFormData>;
    readonly errors: FieldError | undefined;
}

export const NameInput = ({ register, errors }: INameInputProps): JSX.Element => {
    return (
        <FormFieldStyled>
            <LabelStyled htmlFor="name">{Vocab.PortfolioNameRu}</LabelStyled>
            <InputStyled {...register("name", { required: true })} aria-invalid={errors ? "true" : "false"}/>
            {errors?.type === "required" && (
                <ErrorTextStyled role="alert">{Vocab.EmptyPortfolioNameErrorRu}</ErrorTextStyled>
            )}
        </FormFieldStyled>
    )
}

// [== STYLES ==]
const ErrorTextStyled = styled.p`
    color: ${Red};
    font-size: 14px;
    margin-top: 5px;
`;