import { Control, Controller, FieldError, FieldValues, Path, UseFormClearErrors } from "react-hook-form";
import { FormFieldStyled, LabelStyled } from "./styles";
import { Black, Red, White } from "../colors";
import styled from "styled-components";
import { DateField } from "@mui/x-date-pickers";

interface IDateInputProps<T extends FieldValues> {
    readonly label: string;
    readonly control: Control<T>;
    readonly name: Path<T>;
    readonly onRequiredViolated: (error?: FieldError | undefined) => string;
    readonly clearErrors: UseFormClearErrors<T>;
}

const DateInput = <T extends FieldValues>({ label, control, name, onRequiredViolated, clearErrors }: IDateInputProps<T>): JSX.Element => {
    return (
        <Controller 
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, name, value, ref }, fieldState: { error }}) => (
                <FormFieldStyled>
                    <LabelStyled htmlFor={name}>{label}</LabelStyled>
                    <DateField
                        name={name}
                        value={value}
                        onChange={(value) => { onChange(value); clearErrors(name); }}
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
                        <ErrorTextStyled role="alert">{onRequiredViolated(error)}</ErrorTextStyled>
                    ) : error?.message ? (
                        <ErrorTextStyled role="alert">{error.message}</ErrorTextStyled>
                    ) : null}
                </FormFieldStyled>
            )}
        />
    );
}

export default DateInput;

// [== STYLES ==]
const ErrorTextStyled = styled.p`
    color: ${Red};
    font-size: 14px;
    margin-top: 5px;
`;