import { SubmitHandler, useForm } from "react-hook-form";
import { defaultValues, NewPortfolioFormData } from "./types";
import { NameInput } from "./NameInput";
import { TypeSelect } from "./TypeSelect";
import { MainPortfolioSwitch } from "./MainPortfolioSwitch";
import { ColorCircles } from "./ColorCircles";
import { Vocab } from "./vocabulary";
import { PortfolioApi } from "../Api/PortfolioApi";
import { useModalState } from "../Common/ModalStateProvider";
import { Spinner } from "reactstrap";
import { AxiosError } from "axios";
import { PrimaryButton } from "../Common/components/PrimaryButton";
import styled from "styled-components";
import { useEffect } from "react";
import { telegram_isClientEnabled, telegram_isVersionAtLeast, telegram_showAlert } from "../Telegram/utils";
import { Vocab as GlobalVocab } from "../vocabulary";
import { usePopup } from "@telegram-apps/sdk-react";

const CreatePortfolioScreen = ({ hasPortfolios }: { readonly hasPortfolios: boolean; }): JSX.Element => {
    const popup = usePopup();
    const modalState = useModalState("createPortfolio");

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
            const axiosError = ex as AxiosError;
            setError("root.serverError", {
                type: axiosError.code,
                message: axiosError.message
            });

            if (telegram_isClientEnabled() && telegram_isVersionAtLeast("6.0")) {
                await telegram_showAlert(popup, GlobalVocab.ServerErrorRu);
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
            <TypeSelect control={control} />
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