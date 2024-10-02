import { SubmitHandler, UseFormReturn } from "react-hook-form";
import { AddTransactionFormData, AddTransactionRequest } from "./types";
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
import { CoinOptions } from "../Api/coinSearch.schema";
import { PortfolioApi } from "../Api/PortfolioApi";
import { AxiosError } from "axios";
import { AxiosErrorResponse } from "../Api/api.extensions";
import { telegram_isClientEnabled, telegram_isVersionAtLeast, telegram_showAlert } from "../Telegram/utils";
import { useModalState } from "../Common/ModalStateProvider";
import { Vocab as GlobalVocab } from "../vocabulary";
import { usePopup } from "@telegram-apps/sdk-react";

function generateSellOverflowErrorMessage(detail: string | undefined): string {
    if (detail !== undefined && detail !== null) {
        const thanIndex = detail.indexOf("than");
        if (thanIndex > -1) {
            const [limit, coinName] = detail.substring(thanIndex + "than".length).trim().split(" ", 2);
            return Vocab.SellAmountOverflowErrorRu.replace("X", limit).replace("Y", coinName).toString();
        }
    }

    return "";
}

interface IAddTransactionScreenProps {
    form: UseFormReturn<AddTransactionFormData>;
    portfolioId: number;
}

const AddTransactionScreen = ({ form, portfolioId }: IAddTransactionScreenProps): JSX.Element => {
    const popup = usePopup();
    const modalState = useModalState("addTransaction");

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
        const request: AddTransactionRequest = {
            coinName: data.coinName,
            coinTicker: data.coinTicker,
            type: data.type,
            pricePerUnit: data.pricePerUnit,
            amount: data.amount,
            date: data.date.format("YYYY-MM-DD"),
            commission: !data.commission || data.commission === "" ? "0.0" : data.commission,
            notes: data.notes
        };

        try {
            clearErrors();
            await PortfolioApi.createTransaction(portfolioId, request);
            modalState?.setOpen(false);
        }
        catch (ex) {
            if (ex instanceof AxiosError) {
                const responsePayload = ex.response?.data as AxiosErrorResponse;
                if (responsePayload.status === 400) {
                    setError("amount", { type: "validate", message: generateSellOverflowErrorMessage(responsePayload.detail)})
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