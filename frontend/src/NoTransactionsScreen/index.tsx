import styled from "styled-components";
import { PrimaryButton } from "../Common/components/PrimaryButton";
import { LogoNotFoundPageSvg } from "../LogosSvg";
import { NoTransactionsScreenVocab } from "./vocabulary";
import { useModalState } from "../Common/ModalStateProvider";

const NoTransactionsScreen = (): JSX.Element => {
    const modalState = useModalState("addTransaction");

    const handleClickAddTransaction = () => {
        if (modalState) {
            const { open, setOpen } = modalState;
            setOpen(!open);
        }
    }

    return (
        <ContainerStyled>
            <LogoNotFoundPageSvg />
            <AppNameParagraph>{NoTransactionsScreenVocab.TitleRu}</AppNameParagraph>
            <AppMottoParagraph>{NoTransactionsScreenVocab.SecondaryTitleRu}</AppMottoParagraph>
            <ButtonContainerStyled>
                <PrimaryButton disabled={false} onClick={handleClickAddTransaction}>
                    {NoTransactionsScreenVocab.AddTransactionRu}
                </PrimaryButton>
            </ButtonContainerStyled>
        </ContainerStyled>
    )
};

export default NoTransactionsScreen;

// [== STYLES ==]
const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 20vh;
`;

const AppNameParagraph = styled.p`
    font-weight: 700; 
    font-size: 28px;
    margin: 30px 0 10px 0;
`;

const AppMottoParagraph = styled.p`
    font-size: 16px;
    margin: 0;
    margin-bottom: 35px;
`;

const ButtonContainerStyled = styled.div`
    max-width: 335px;
    width: 335px;
    display: flex;
    justify-content: center;
`;