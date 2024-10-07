import styled from "styled-components";
import { PrimaryButton } from "../Common/components/PrimaryButton";
import { LogoMainPageSvg } from "../LogosSvg";
import { WelcomeScreenVocab } from "./vocabulary";
import { useModalState } from "../Common/ModalStateProvider";
import { useMemo } from "react";
import CreatePortfolioModalFunction from '../Modals/CreatePortfolioModal';

interface IWelcomeScreenProps {
    readonly setShouldRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const WelcomeScreen = ({ setShouldRender }: IWelcomeScreenProps): JSX.Element => {
    const CreatePortfolioModalComponent = useMemo(() => CreatePortfolioModalFunction({ 
        modalName: "createFirstPortfolio", 
        hasPortfolios: false,
        onModalClosed: (newPortfolioCreated: boolean) => {
            if (newPortfolioCreated) {
                setShouldRender(false);
            }
        }, 
    }), [setShouldRender]);
    
    const modalState = useModalState("createFirstPortfolio");

    const handleClickAddPortfolio = () => {
        if (modalState) {
            const { open, setOpen } = modalState;
            setOpen(!open);
        }
    }

    return (
        <>
            <CreatePortfolioModalComponent />
            <ContainerStyled>
                <LogoMainPageSvg />
                <AppNameParagraph>CapitalView</AppNameParagraph>
                <AppMottoParagraph>{WelcomeScreenVocab.TitleRu}</AppMottoParagraph>
                <ButtonContainerStyled>
                    <PrimaryButton disabled={false} onClick={handleClickAddPortfolio}>
                        {WelcomeScreenVocab.AddPortfolioRu}
                    </PrimaryButton>
                </ButtonContainerStyled>
            </ContainerStyled>
        </>
    )
};

export default WelcomeScreen;

// [== STYLES ==]
const ContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    top: 30vh;
`;

const AppNameParagraph = styled.p`
    font-weight: 700; 
    font-size: 28px;
    margin: 0 0 10px 0;
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