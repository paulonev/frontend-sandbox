import { FieldError, FieldValues, Path, PathValue, UseFormRegister } from "react-hook-form";
import { FormFieldStyled, InputStyled, LabelStyled } from "../Common/forms/styles";
import styled from "styled-components";
import { Red } from "../Common/colors";
import { Vocab } from "./vocabulary";
import Big from "big.js";

interface IDecimalInputProps<T extends FieldValues> {
    readonly isRequired: boolean;
    readonly register: UseFormRegister<T>;
    readonly errors: FieldError | undefined;
    readonly formKey: Path<T>;
    readonly label: string;
    readonly placeholder?: string;
    readonly autoComplete?: "on" | "off";
    readonly greaterZeroRequired?: boolean;
}

export const PositiveDecimalInput = <T extends FieldValues>(
    { isRequired, register, errors, formKey, label, placeholder, autoComplete = "on", greaterZeroRequired = false }: IDecimalInputProps<T>): JSX.Element => 
{
    const validateInner = (value: PathValue<T, Path<T>>) => {
        let isValid = false;
        if (!isRequired) {
            isValid = !value.startsWith("-");
        } else {
            isValid = value && !value.startsWith("-");
            if (greaterZeroRequired && value) {
                isValid = isValid && new Big(value).gt(0);
            }
        }

        return isValid;
    }

    const showErrorMessageOr = (message: string | undefined, fallback: string): string => {
        if (message && message.length > 0) return message;
        return fallback;
    }

    if (!isRequired) {
        return (
            <FormFieldStyled>
                <LabelStyled htmlFor={formKey}>{label}</LabelStyled>
                <InputStyled {...register(formKey, { pattern: /^(-)?\d*\.?\d*$/i, validate: validateInner })} 
                    aria-invalid={errors ? "true" : "false"} 
                    placeholder={placeholder} 
                    autoComplete={autoComplete} 
                />
                {errors?.type === "pattern" && (
                    <ErrorTextStyled role="alert">{ showErrorMessageOr(errors?.message, Vocab.ValueIsNotValidDecimalRu)}</ErrorTextStyled>
                )}
                {errors?.type === "validate" && (
                    <ErrorTextStyled role="alert">{ showErrorMessageOr(errors?.message, Vocab.ValueIsNotPositiveRu) }</ErrorTextStyled>
                )}
            </FormFieldStyled>
        );
    }

    return (
        <FormFieldStyled>
            <LabelStyled htmlFor={formKey}>{label}</LabelStyled>
            <InputStyled {...register(formKey, { required: true, pattern: /^(-)?\d*\.?\d*$/i, validate: validateInner })} 
                aria-invalid={errors ? "true" : "false"} 
                placeholder={placeholder} 
                autoComplete={autoComplete} 
            />
            {errors?.type === "required" && (
                <ErrorTextStyled role="alert">{showErrorMessageOr(errors?.message, Vocab.EmptyRequiredFieldErrorRu)}</ErrorTextStyled>
            )}
            {errors?.type === "pattern" && (
                <ErrorTextStyled role="alert">{showErrorMessageOr(errors?.message, Vocab.ValueIsNotValidDecimalRu)}</ErrorTextStyled>
            )}
            {errors?.type === "validate" && (
                <ErrorTextStyled role="alert">{showErrorMessageOr(errors?.message, Vocab.ValueIsNotPositiveRu)}</ErrorTextStyled>
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