import { Control, Controller, PathValue } from "react-hook-form";
import { AddCurrencyTransactionFormData } from "./types";
import { Vocab } from "./vocabulary";
import Big from "big.js";
import styled from "styled-components";
import { Red } from "../Common/colors";
import { FormFieldStyled, InputStyled, LabelStyled } from "../Common/forms/styles";

interface IQuantityInputProps {
    readonly control: Control<AddCurrencyTransactionFormData>;
}

const validNumberPattern: RegExp = /^(-)?\d*\.?\d*$/i;

export const QuantityInput = ({ control }: IQuantityInputProps): JSX.Element => {
    const validateInner = (value: PathValue<AddCurrencyTransactionFormData, "amount">) => {
        let isValid = false;
        isValid = !!value && !value.startsWith("-");
        if (value) {
            isValid = isValid && new Big(value).gt(0);
        }

        return isValid;
    }

    const showErrorMessageOr = (message: string | undefined, fallback: string): string => {
        if (message && message.length > 0) return message;
        return fallback;
    }
    
    return (
        <Controller 
            name={"amount"}
            control={control}
            rules={{ required: true, pattern: validNumberPattern, validate: validateInner }}
            render={({
                field: { onChange, onBlur, name, value, ref },
                fieldState: { error },
            }) => (
                <FormFieldStyled>
                    <LabelStyled htmlFor="amount">{Vocab.QuantityLabelRu}</LabelStyled>
                    <InputStyled
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={() => {
                            if (!!value && validNumberPattern.test(value)) {
                                onChange(parseFloat(value).toFixed(2).toString())
                            }
                            onBlur();
                        }}
                        ref={ref}
                        placeholder="100.00"
                        autoComplete="off"
                    />
                    {error?.type === "required" && (
                        <ErrorTextStyled role="alert">{showErrorMessageOr(error?.message, Vocab.EmptyRequiredFieldErrorRu)}</ErrorTextStyled>
                    )}
                    {error?.type === "pattern" && (
                        <ErrorTextStyled role="alert">{showErrorMessageOr(error?.message, Vocab.ValueIsNotValidDecimalRu)}</ErrorTextStyled>
                    )}
                    {error?.type === "validate" && (
                        <ErrorTextStyled role="alert">{showErrorMessageOr(error?.message, Vocab.ValueIsNotPositiveRu)}</ErrorTextStyled>
                    )}
                </FormFieldStyled>
            )}
        />
    );
}

// [== STYLES ==]
const ErrorTextStyled = styled.p`
    color: ${Red};
    font-size: 14px;
    margin-top: 5px;
`;