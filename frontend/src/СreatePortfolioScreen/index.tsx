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
import { telegram_showAlert } from "../Telegram/utils";
import { PrimaryButton } from "../Common/components/PrimaryButton";
import styled from "styled-components";

const CreatePortfolioScreen = ({ hasPortfolios }: { readonly hasPortfolios: boolean; }): JSX.Element => {
    const modalState = useModalState("createPortfolio");

    const { 
        register, 
        control, 
        watch,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid } 
    } = useForm<NewPortfolioFormData>({ defaultValues: {...defaultValues, isMainPortfolio: !hasPortfolios } });
    const watchIsMainPortfolio = watch("isMainPortfolio", defaultValues.isMainPortfolio);

    const onFormSubmit: SubmitHandler<NewPortfolioFormData> = async (data) => {
        try {
            await PortfolioApi.createPortfolio(data);
            modalState?.setOpen(false);
        }
        catch (ex) {
            const axiosError = ex as AxiosError;
            setError("root.serverError", {
                type: axiosError.code,
                message: axiosError.message
            });

            telegram_showAlert(Vocab.ServerErrorRu);
        }
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <NameInput register={register} errors={errors.name} />
            <TypeSelect control={control} />
            <MainPortfolioSwitch control={control} disabled={!hasPortfolios} />
            {!watchIsMainPortfolio && <ColorCircles control={control} />}
            
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