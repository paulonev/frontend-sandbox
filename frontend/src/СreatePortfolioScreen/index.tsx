import styled from "styled-components";
import { Vocab } from "./vocabulary";
import { NewPortfolioForm } from "./NewPortfolioForm";

const CreatePortfolioScreen = (): JSX.Element => {
    return (
        <>
            <HeaderStyled>{Vocab.CreatePortfolioRu}</HeaderStyled>
            <NewPortfolioForm />
        </>
    )
}

export default CreatePortfolioScreen;

// [== STYLES ==]
const HeaderStyled = styled.div`
    font-weight: 600;
    font-size: 25px;
    width: 100%;
    text-align: center;
    margin-bottom: 40px;
`;