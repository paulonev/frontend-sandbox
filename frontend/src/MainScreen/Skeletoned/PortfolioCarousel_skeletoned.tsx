/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import PortfolioCard from "./PortfolioCard_skeletoned";

const PortfolioCarousel_skeletoned = (): JSX.Element => {
    return (
        <CarouselContainerStyled>
            <CarouselStyled>
                <PortfolioCard key={0} />
                <PortfolioCard key={1} />
                <PortfolioCard key={2} />
            </CarouselStyled>
        </CarouselContainerStyled>
    );
}

export default PortfolioCarousel_skeletoned;

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