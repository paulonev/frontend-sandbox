import { SubmitHandler, useForm } from "react-hook-form";
import { defaultValues, NewPortfolioFormData } from "./types";
import { NameInput } from "./NameInput";
import { MainPortfolioSwitch } from "./MainPortfolioSwitch";
import { ColorCircles } from "./ColorCircles";
import { Vocab } from "./vocabulary";
import { PortfolioApi } from "../Api/PortfolioApi";
import { Modals, useModalState } from "../Common/ModalStateProvider";
import { Spinner } from "reactstrap";
import { AxiosError } from "axios";
import { PrimaryButton } from "../Common/components/PrimaryButton";
import styled from "styled-components";
import { useEffect } from "react";
import { AxiosErrorResponse } from "../Api/api.extensions";
import { telegram_isClientEnabled, telegram_isVersionAtLeast, telegram_showAlert } from "../Telegram/utils";
import { Vocab as GlobalVocab } from "../vocabulary";
import { usePopup } from "@telegram-apps/sdk-react";
import { TypeSelect } from "../Common/forms/TypeSelect";

interface ICreatePortfolioScreenProps {
    readonly hasPortfolios: boolean;
    readonly modalName: Modals;
}

const CreatePortfolioScreen = ({ hasPortfolios, modalName }: ICreatePortfolioScreenProps): JSX.Element => {
    const popup = usePopup();
    const modalState = useModalState(modalName);

    const { 
        register, 
        control, 
        watch,
        handleSubmit,
        setError,
        setValue,
        clearErrors,
        formState: { errors, isSubmitting, isValid } 
    } = useForm<NewPortfolioFormData>({ defaultValues: {...defaultValues, isMainPortfolio: !hasPortfolios } });
    const watchIsMainPortfolio = watch("isMainPortfolio", defaultValues.isMainPortfolio);

    const onFormSubmit: SubmitHandler<NewPortfolioFormData> = async (data) => {
        try {
            clearErrors();
            await PortfolioApi.createPortfolio(data);
            modalState?.setOpen(false);
        }
        catch (ex) {
            if (ex instanceof AxiosError) {
                const responsePayload = ex.response?.data as AxiosErrorResponse;
                if (responsePayload.status === 409) {
                    setError("name", { type: "validate", message: Vocab.NameForPortfolioIsInUseRu })
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

    useEffect(() => {
        const { unsubscribe } = watch((data) => {
            if (!!data.isMainPortfolio && data.portfolioColor !== "pattensBlue") {
                setValue("portfolioColor", "pattensBlue");
            }
        });

        return () => unsubscribe();
    }, [setValue, watch]);

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <NameInput register={register} errors={errors.name} />
            <TypeSelect 
                name={"portfolioType"}
                control={control}
                label={Vocab.PortfolioTypeRu}
                renderOptions={() => (
                    <>
                        <option value="crypto">{Vocab.CryptoSelectOptionRu}</option>
                        <option value="stocks" disabled={true} aria-disabled={true}>
                            {Vocab.StocksSelectOptionRu} ({GlobalVocab.SoonRu})
                        </option>
                    </>
                )}
            />
            <MainPortfolioSwitch control={control} disabled={!hasPortfolios} />
            {hasPortfolios && !watchIsMainPortfolio && <ColorCircles control={control} />}
            
            <ButtonContainerStyled>
                <PrimaryButton type="submit" disabled={!isValid || isSubmitting}>
                    {isSubmitting && <Spinner size="sm">{''}</Spinner>}
                    {' '}
                    {Vocab.SubmitButtonRu}
                </PrimaryButton>
            </ButtonContainerStyled>
        </form>
    )
}

export default CreatePortfolioScreen;

// [== STYLES ==]
const ButtonContainerStyled = styled.div`
    position: absolute;
    bottom: 20px;
`;