import { FieldError, UseFormRegister } from "react-hook-form";
import { AddTransactionFormData } from "./types";
import { Vocab } from "./vocabulary";
import { PositiveDecimalInput } from "./DecimalInput";

interface IUnitPriceInputProps {
    readonly register: UseFormRegister<AddTransactionFormData>;
    readonly errors: FieldError | undefined;
}

export const UnitPriceInput = ({ register, errors }: IUnitPriceInputProps): JSX.Element => {
    return (
        <PositiveDecimalInput
            isRequired
            register={register} 
            errors={errors}
            formKey="pricePerUnit"
            label={Vocab.PricePerUnitLabelRu}
            placeholder="0.0000001"
            autoComplete="off"
        />
    );
}