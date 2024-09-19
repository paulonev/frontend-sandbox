import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FormFieldStyled, InputStyled, LabelStyled } from "../Common/forms/styles";
import styled from "styled-components";
import { Red } from "../Common/colors";
import { Vocab } from "./vocabulary";

interface IDecimalInputProps<T extends FieldValues> {
    readonly isRequired: boolean;
    readonly register: UseFormRegister<T>;
    readonly errors: FieldError | undefined;
    readonly formKey: Path<T>;
    readonly label: string;
    readonly placeholder?: string;
    readonly autoComplete?: "on" | "off";
}

export const PositiveDecimalInput = <T extends FieldValues>(
    { isRequired, register, errors, formKey, label, placeholder, autoComplete = "on" }: IDecimalInputProps<T>): JSX.Element => 
{
    if (!isRequired) {
        return (
            <FormFieldStyled>
                <LabelStyled htmlFor={formKey}>{label}</LabelStyled>
                <InputStyled {...register(formKey, { pattern: /^(-)?\d*\.?\d*$/i, validate: (value) => !value.startsWith("-")})} 
                    aria-invalid={errors ? "true" : "false"} 
                    placeholder={placeholder} 
                    autoComplete={autoComplete} 
                />
                {errors?.type === "pattern" && (
                    <ErrorTextStyled role="alert">{Vocab.ValueIsNotValidDecimalRu}</ErrorTextStyled>
                )}
                {errors?.type === "validate" && (
                    <ErrorTextStyled role="alert">{Vocab.ValueIsNotPositiveRu}</ErrorTextStyled>
                )}
            </FormFieldStyled>
        );
    }

    return (
        <FormFieldStyled>
            <LabelStyled htmlFor={formKey}>{label}</LabelStyled>
            <InputStyled {...register(formKey, { required: true, pattern: /^(-)?\d*\.?\d*$/i, validate: (value) => !value.startsWith("-")})} 
                aria-invalid={errors ? "true" : "false"} 
                placeholder={placeholder} 
                autoComplete={autoComplete} 
            />
            {errors?.type === "required" && (
                <ErrorTextStyled role="alert">{Vocab.EmptyRequiredFieldErrorRu}</ErrorTextStyled>
            )}
            {errors?.type === "pattern" && (
                <ErrorTextStyled role="alert">{Vocab.ValueIsNotValidDecimalRu}</ErrorTextStyled>
            )}
            {errors?.type === "validate" && (
                <ErrorTextStyled role="alert">{Vocab.ValueIsNotPositiveRu}</ErrorTextStyled>
            )}
        </FormFieldStyled>
    );
}

// [== STYLES ==]
const ErrorTextStyled = styled.p`
    color: ${Red};
    font-size: 14px;
    margin-top: 5px;
`;