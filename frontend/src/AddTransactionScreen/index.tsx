import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { AddTransactionFormData, CoinOptions, AddTransactionRequest } from "./types";
import styled from "styled-components";
import { PrimaryButton } from "../Common/components/PrimaryButton";
import { Spinner } from "reactstrap";
import { Vocab } from "./vocabulary";
import { NameAutocompleteField } from "./NameAutocompleteField";
import { TypeSelect } from "./TypeSelect";
import { UnitPriceInput } from "./UnitPriceInput";
import { QuantityInput } from "./QuantityInput";
import { DateInput } from "./DateInput";
import { CommissionPriceInput } from "./CommissionPriceInput";
import { NotesInput } from "./NotesInput";
import { OverallTransactionAmount } from "./OverallTransactionAmount";
import dayjs from "dayjs";

interface IAddTransactionScreenProps {
    form: UseFormReturn<AddTransactionFormData>;
}

const AddTransactionScreen = ({ form }: IAddTransactionScreenProps): JSX.Element => {
    const { 
        register, 
        control, 
        watch,
        handleSubmit,
        setError,
        setValue,
        clearErrors,
        getValues,
        formState: { errors, isSubmitting, isValid } 
    } = form;

    const onFormSubmit: SubmitHandler<AddTransactionFormData> = async (data) => {
        const requestBody: AddTransactionRequest = {
            coinName: data.coinName,
            coinTicker: data.coinTicker,
            type: data.type,
            pricePerUnit: data.pricePerUnit,
            amount: data.amount,
            date: `${data.date.year()}-${data.date.month()+1}-${data.date.date()}`,
            commission: !data.commission || data.commission === "" ? "0.0" : data.commission,
            notes: data.notes
        };

        console.log("requestBody", requestBody);
    }

    const handleCoinChange = (value: CoinOptions[0] | null) => {
        if (!value) {
            setError("coinName", {
                type: "validate",
                message: Vocab.CoinNotSelectedRu
            })
        }
        else {
            clearErrors();

            setValue("coinName", value.coinName);
            setValue("coinTicker", value.coinTicker);
            setValue("pricePerUnit", value.pricePerUnit)
        }
    }

    const onSubmitClicked = () => {
        if (!getValues("coinName") || !getValues("coinTicker")) {
            setError("coinName", {
                type: "required",
                message: Vocab.CoinNotSelectedRu
            });
        }

        const transactionDate = getValues("date");
        if (!transactionDate?.isValid()) {
            setError("date", {
                type: "validate",
                message: Vocab.IncorrectDateErrorRu
            });
        }
        else if (transactionDate.isAfter(dayjs(new Date()))) {
            setError("date", {
                type: "validate",
                message: Vocab.DateInFutureErrorRu
            });
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <NameAutocompleteField errors={errors.coinName} handleOnChange={handleCoinChange}/>
            <TypeSelect control={control} />
            <UnitPriceInput register={register} errors={errors.pricePerUnit} />
            <QuantityInput register={register} errors={errors.amount} />
            <DateInput control={control} type={watch("type")} clearErrors={clearErrors} />
            <CommissionPriceInput register={register} errors={errors.commission} />
            <NotesInput register={register} />
            <OverallTransactionAmount amount={watch("amount")} pricePerUnit={watch("pricePerUnit")} commission={watch("commission")} type={watch("type")} />

            <ButtonContainerStyled>
                <PrimaryButton type="submit" disabled={(!isValid && !!Object.entries(errors).length) || isSubmitting} onClick={onSubmitClicked}>
                    {isSubmitting && <Spinner size="sm">{''}</Spinner>}
                    {' '}
                    {Vocab.SubmitButtonRu}
                </PrimaryButton>
            </ButtonContainerStyled>
        </form>
    )
}

export default AddTransactionScreen;

// [== STYLES ==]
const ButtonContainerStyled = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
`;