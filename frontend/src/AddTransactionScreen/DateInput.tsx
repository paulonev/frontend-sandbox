import { Control, Controller, UseFormClearErrors } from "react-hook-form";
import { FormFieldStyled, LabelStyled } from "../Common/forms/styles";
import { Black, Red, White } from "../Common/colors";
import styled from "styled-components";
import { AddTransactionFormData, TransactionType } from "./types";
import { Vocab } from "./vocabulary";
import { DateField } from "@mui/x-date-pickers";

interface IDateInputProps {
    readonly type: TransactionType;
    readonly control: Control<AddTransactionFormData>;
    readonly clearErrors: UseFormClearErrors<AddTransactionFormData>;
}

export const DateInput = ({ type, control, clearErrors }: IDateInputProps): JSX.Element => {
    return (
        <Controller 
            name="date"
            control={control}
            render={({ field: { onChange, onBlur, name, value, ref }, fieldState: { error }}) => (
                <FormFieldStyled>
                    <LabelStyled htmlFor="date">{type === "Buy" ? Vocab.BuyDateLabelRu : Vocab.SellDateLabelRu}</LabelStyled>
                    <DateField
                        name={name}
                        value={value}
                        onChange={(value) => { onChange(value); clearErrors("date"); }}
                        onBlur={onBlur}
                        format="DD.MM.YYYY"
                        inputRef={ref}
                        inputProps={{ style: {
                            width: "100%",
                            padding: "12.5px 12px",
                            borderRadius: 12,
                            border: "none",
                            color: Black,
                            fontWeight: 400,
                            fontFamily: "inherit",
                            fontSize: 16,
                        }}}
                        InputProps={{ sx: { 
                            border: "0.5px solid rgba(130, 130, 130, 0.1)",
                            borderRadius: "12px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
                            background: White,
                            paddingRight: 0,
                            "::before": {
                                border: "none"
                            }
                        }}}
                        disableFuture
                        hiddenLabel
                        variant="filled"
                    />
                    {error?.type === "required" ? (
                        <ErrorTextStyled role="alert">{Vocab.EmptyRequiredFieldErrorRu}</ErrorTextStyled>
                    ) : error?.message ? (
                        <ErrorTextStyled role="alert">{error.message}</ErrorTextStyled>
                    ) : null}
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