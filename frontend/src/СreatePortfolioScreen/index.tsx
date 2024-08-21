import { SubmitHandler, useForm } from "react-hook-form";
import { defaultValues, NewPortfolioFormData } from "./types";
import { NameInput } from "./NameInput";
import { TypeSelect } from "./TypeSelect";
import { MainPortfolioSwitch } from "./MainPortfolioSwitch";
import { ColorCircles } from "./ColorCircles";
import { White } from "../Common/colors";
import { Vocab } from "./vocabulary";
import styled from "styled-components";
import { PortfolioCardTheme } from "../MainScreen/PortfolioCardTheme";
import { PortfolioApi } from "../Api/PortfolioApi";
import { useModalState } from "../Common/ModalStateProvider";
import { Spinner } from "reactstrap";
import { AxiosError } from "axios";
import { telegram_showAlert } from "../Telegram/utils";

const CreatePortfolioScreen = (): JSX.Element => {
    const modalState = useModalState("createPortfolio");

    const { 
        register, 
        control, 
        watch,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid } 
    } = useForm<NewPortfolioFormData>({ defaultValues });
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
            <MainPortfolioSwitch control={control} />
            {!watchIsMainPortfolio && <ColorCircles control={control} />}
            
            <ButtonStyled type="submit" disabled={!isValid || isSubmitting}>
                {isSubmitting && <Spinner size="sm">{''}</Spinner>}
                {' '}
                {Vocab.SubmitButtonRu}
            </ButtonStyled>
        </form>
    )
}

export default CreatePortfolioScreen;

// [== STYLES ==]
const ButtonStyled = styled.button`
    background-color: ${PortfolioCardTheme.main.bgColor};
    color: ${White};

    position: absolute;
    bottom: 20px;
    width: 91.5vw;

    border-radius: 12.13px;
    height: 40px;
    text-align: center;
    box-sizing: border-box;

    &:disabled {
        background-color: rgba(66, 106, 249, 0.4);
    }
`;