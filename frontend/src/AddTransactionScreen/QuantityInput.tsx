import { FieldError, UseFormRegister } from "react-hook-form";
import { AddTransactionFormData } from "./types";
import { Vocab } from "./vocabulary";
import { PositiveDecimalInput } from "./DecimalInput";

interface IQuantityInputProps {
    readonly register: UseFormRegister<AddTransactionFormData>;
    readonly errors: FieldError | undefined;
}

export const QuantityInput = ({ register, errors }: IQuantityInputProps): JSX.Element => {
    return (
        <PositiveDecimalInput 
            isRequired
            register={register} 
            errors={errors}
            formKey="amount"
            label={Vocab.QuantityLabelRu}
            placeholder="100"
            autoComplete="off"
        />
    );
}