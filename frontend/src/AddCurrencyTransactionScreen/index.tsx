import { usePopup } from "@telegram-apps/sdk-react";
import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { AddCurrencyTransactionFormData, AddCurrencyTransactionRequest } from "./types";
import { Spinner } from "reactstrap";
import styled from "styled-components";
import { PrimaryButton } from "../Common/components/PrimaryButton";
import { Vocab } from "./vocabulary";
import dayjs from "dayjs";
import { NotesInput } from "../Common/forms/NotesInput";
import DateInput from "../Common/forms/DateInput";
import { TypeSelect } from "../Common/forms/TypeSelect";
import { QuantityInput } from "./QuantityInput";
import { PortfolioApi } from "../Api/PortfolioApi";
import { useModalState } from "../Common/ModalStateProvider";
import { AxiosError } from "axios";
import { AxiosErrorResponse } from "../Api/api.extensions";
import { telegram_isClientEnabled, telegram_isVersionAtLeast, telegram_showAlert } from "../Telegram/utils";
import { Vocab as GlobalVocab } from "../vocabulary";

function generateWithdrawOverflowErrorMessage(detail: string | undefined): string {
    if (detail !== undefined && detail !== null) {
        const thanIndex = detail.indexOf("than");
        if (thanIndex > -1) {
            const limit = detail.substring(thanIndex + "than".length).trim();
            return Vocab.WithdrawAmountOverflowErrorRu.replace("X", limit).toString();
        }
    }

    return "";
}

interface IAddCurrencyTransactionScreenProps {
    form: UseFormReturn<AddCurrencyTransactionFormData>;
    portfolioId: number;
}

const AddCurrencyTransactionScreen = ({ portfolioId, form }: IAddCurrencyTransactionScreenProps): JSX.Element => {
    const popup = usePopup();
    const modalState = useModalState("addCurrencyTransaction");
    
    const {
        control,
        register,
        handleSubmit,
        clearErrors,
        watch,
        getValues,
        setError,
        formState: { errors, isSubmitting, isValid }
    } = form;
    
    const onFormSubmit: SubmitHandler<AddCurrencyTransactionFormData> = async (data) => {
        const request: AddCurrencyTransactionRequest = {
            portfolioId,
            type: data.type,
            amount: parseFloat(data.amount),
            date: data.date.format("YYYY-MM-DD"),
            currency: data.currency ?? "USD",
            notes: data.notes
        };

        try {
            clearErrors();
            await PortfolioApi.createCurrencyTransaction(request);
            modalState?.setOpen(false);
        }
        catch (ex) {
            if (ex instanceof AxiosError) {
                const responsePayload = ex.response?.data as AxiosErrorResponse;
                if (responsePayload.status === 400) {
                    setError("amount", { type: "validate", message: generateWithdrawOverflowErrorMessage(responsePayload.detail)})
                } else {
                    setError("root.serverError", {
                        type: ex.code,
                        message: ex.message
                    });

                    if (telegram_isClientEnabled() && telegram_isVersionAtLeast("6.0")) {
                        await telegram_showAlert(popup, GlobalVocab.ServerErrorRu);
                    }
                }
            }
        }
    }

    const onSubmitClicked = () => {
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
            <TypeSelect 
                name="type"
                label={Vocab.CurrencyTransactionTypeLabelRu}
                control={control}
                renderOptions={() => (
                    <>
                        <option value="Replenish">{Vocab.ReplenishCurrencyTransactionTypeRu}</option>
                        <option value="Withdraw">{Vocab.WithdrawCurrencyTransactionTypeRu}</option>
                    </>
                )} 
            />
            <QuantityInput control={control}/>
            <DateInput 
                name="date"
                control={control}
                label={watch("type") === "Replenish" ? Vocab.ReplenishDateLabelRu : Vocab.WithdrawDateLabelRu}
                clearErrors={clearErrors} 
                onRequiredViolated={() => Vocab.EmptyRequiredFieldErrorRu}    
            />
            <NotesInput 
                name={"notes"} 
                label={Vocab.NotesLabelRu} 
                register={register} 
            />

            {/* TODO: to the bottom of the modal, but not absolute position */}
            <ButtonContainerStyled>
                <PrimaryButton type="submit" disabled={(!isValid && !!Object.entries(errors).length) || isSubmitting} onClick={onSubmitClicked}>
                    {isSubmitting && <Spinner size="sm">{''}</Spinner>}
                    {' '}
                    {Vocab.SubmitButtonRu}
                </PrimaryButton>
            </ButtonContainerStyled>
        </form>
    )
};

export default AddCurrencyTransactionScreen;

// [== STYLES ==]
const ButtonContainerStyled = styled.div`
    margin-top: 30px;
    display: flex;
    justify-content: center;
`;