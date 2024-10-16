/* eslint-disable react-refresh/only-export-components */
import styled from 'styled-components';
import { MainScreen } from '../vocabulary';
import Skeleton from 'react-loading-skeleton';
import SkeletonWrapper from '../../Common/components/SkeletonWrapper';
import { SecondaryHeaderColor } from '../../Common/colors';

const PortfoliosSummary_skeletoned = (): JSX.Element => {
    return (
        <SectionStyled>
            <HeaderStyled>{MainScreen.OverallVolumeRu}</HeaderStyled>
            <ContentStyled>
                <Skeleton wrapper={SkeletonWrapper} style={{ lineHeight: 1.8 }} />
                <Skeleton wrapper={SkeletonWrapper} style={{ lineHeight: 1.8 }} />
            </ContentStyled>
        </SectionStyled>
    )
}

export default PortfoliosSummary_skeletoned;

/// [==Styles==]
const SectionStyled = styled.div`
    margin: 20px 20px 0;
`;

const HeaderStyled = styled.div`
    font-family: "Inter", sans-serif;
    font-weight: 500;
    font-size: 14px;
    color: ${SecondaryHeaderColor};
`;

const ContentStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
`;