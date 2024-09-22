import { Control, Controller } from "react-hook-form";
import { FormFieldStyled, LabelStyleRules } from "../Common/forms/styles";
import { FormGroup, Input, Label } from "reactstrap";
import { CSSProperties } from "react";
import { Black } from "../Common/colors";
import { AddTransactionFormData } from "./types";
import { Vocab } from "./vocabulary";

interface ITypeSelectProps {
    readonly control: Control<AddTransactionFormData>;
}

export const TypeSelect = ({ control }: ITypeSelectProps) => {
    return (
        <Controller 
            name="type"
            control={control}
            render={({ field: { onChange, onBlur, name, value, ref }}) => (
                <FormFieldStyled>
                    <FormGroup>
                        <Label htmlFor="type" style={LabelStyleRules}>
                            {Vocab.TransactionTypeRu}
                        </Label>
                        <Input
                            type="select"
                            style={{...InputStyleRules, ...SelectResetStyles, ...ArrowStyleRules}}
                            onChange={onChange}
                            onBlur={onBlur}
                            name={name}
                            value={value}
                            innerRef={ref}
                        >
                            <option value="Buy">{Vocab.TransactionTypeBuyRu}</option>
                            <option value="Sell">{Vocab.TransactionTypeSellRu}</option>
                        </Input>
                    </FormGroup>
                </FormFieldStyled>
            )}
        />
    )
}
                
// [== STYLES ==]
const InputStyleRules = {
    width: "100%",
    padding: "10px 12px",
    border: "1.23px solid rgba(130, 130, 130, 0.1)",
    borderRadius: "12px",
    boxSizing: "border-box",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
    color: Black,
    fontWeight: 400,
    fontSize: "16px",
    fontFamily: "inherit",
} as CSSProperties;

const ArrowStyleRules = {
    backgroundImage: "linear-gradient(45deg, transparent 50%, #007AFF 50%), linear-gradient(135deg, #007AFF 50%, transparent 50%)",
    backgroundPosition: "calc(100% - 20px) calc(1em + 6px), calc(100% - 15px) calc(1em + 6px), 100% 0",
    backgroundSize: "5px 5px, 5px 5px, 2.5em 2.5em",
    backgroundRepeat: "no-repeat"
} as CSSProperties;

const SelectResetStyles = {
    margin: 0,      
    boxSizing: "border-box",
    appearance: "none",
} as CSSProperties;
