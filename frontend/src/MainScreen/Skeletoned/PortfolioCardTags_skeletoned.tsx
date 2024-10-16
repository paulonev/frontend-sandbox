/* eslint-disable react-refresh/only-export-components */
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import SkeletonWrapper from "../../Common/components/SkeletonWrapper";

const PortfolioCardTags_skeletoned = (): JSX.Element => {
    return (
        <TagsContainerStyled>
            <Skeleton wrapper={SkeletonWrapper} style={{ lineHeight: 2, marginTop: 15 }}/>
        </TagsContainerStyled>
    );
}

export default PortfolioCardTags_skeletoned;

// [== STYLES ==]
const TagsContainerStyled = styled.div`
    display: flex;
    justify-content: flex-end;
`;
