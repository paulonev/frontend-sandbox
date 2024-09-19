import { FieldError, UseFormRegister } from "react-hook-form";
import { AddTransactionFormData } from "./types";
import { Vocab } from "./vocabulary";
import { PositiveDecimalInput } from "./DecimalInput";

interface ICommissionPriceInputProps {
    readonly register: UseFormRegister<AddTransactionFormData>;
    readonly errors: FieldError | undefined;
}

export const CommissionPriceInput = ({ register, errors }: ICommissionPriceInputProps): JSX.Element => {
    return (
        <PositiveDecimalInput 
            isRequired={false}
            register={register} 
            errors={errors}
            formKey="commission"
            label={Vocab.CommissionLabelRu}
            autoComplete="off"
        />
    );
}