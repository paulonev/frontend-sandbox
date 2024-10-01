import styled from "styled-components";
import { PortfolioCard } from "./PortfolioCard";
import { useModalState } from "../Common/ModalStateProvider";
import { AddButton } from "../Common/components/AddButtonSvg";
import { PortfolioItem } from "../Api/portfolios.schema";
import { useUnlimitedPortfoliosViolationCheck } from "../PremiumFeatures/PremiumFeaturesProvider";
import { telegram_showAlert } from "../Telegram/utils";
import { MainScreen } from "./vocabulary";

interface IPortfolioCarouselProps {
    readonly items: PortfolioItem[];
    readonly selectPortfolio: (item: PortfolioItem) => void;
}

export const PortfolioCarousel = ({ items, selectPortfolio }: IPortfolioCarouselProps) => {
    const modalState = useModalState("createPortfolio");
    const { violated } = useUnlimitedPortfoliosViolationCheck();

    const handleClickAddPortfolio = () => {
        //TODO: pass valid isPremium
        const isPremium = false;
        if (violated(isPremium)) {
            console.log('portfolios amount violation screen');
            telegram_showAlert(MainScreen.MaximumAllowedPortfoliosViolationRu);
            return;
        }

        if (modalState) {
            const { open, setOpen } = modalState;
            setOpen(!open);
        }
    }

    return (
        <CarouselContainerStyled>
            <CarouselStyled>
                {items.length ? items.map((x, index) => <PortfolioCard key={index} item={x} onClick={selectPortfolio} />) : null}
                <AddButtonCardStyled>
                    <button onClick={handleClickAddPortfolio}>
                        <AddButton />
                    </button>
                </AddButtonCardStyled>
            </CarouselStyled>
        </CarouselContainerStyled>
    )
}

// [== STYLES ==]
const CarouselContainerStyled = styled.div`
    width: 100%;
    overflow: hidden;
`;

const CarouselStyled = styled.div`
    display: flex;
    padding: 20px;
    padding-top: 0;
    gap: 10px;
    scroll-snap-type: x mandatory;
    overflow-x: auto;
`;

const AddButtonCardStyled = styled.div`
    background: none;
    width: auto;
    flex: none;
    scroll-snap-align: start;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    > button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
    }

    > button > img {
        width: 40px;
        height: 40px; 
    }
`;