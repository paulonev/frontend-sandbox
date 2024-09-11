import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useModalState } from "../Common/ModalStateProvider";
import styled from "styled-components";
import { Vocab } from "../СreatePortfolioScreen/vocabulary";
import CreatePortfolioScreen from "../СreatePortfolioScreen";
import { ArrowLeft } from "../Common/components/ArrowLeft";
import { useQueryClient } from "@tanstack/react-query";
import { MainScreenQueryKey } from "../constants";

export const CreatePortfolioModal = () => {
    const queryClient = useQueryClient();
    const modalState = useModalState("createPortfolio");

    //reset MainScreen query to its pre-loaded (null in our case) state, and refetch the query since it's active
    const resetPortfolioScreenQuery = () =>
        queryClient.resetQueries({ queryKey: [MainScreenQueryKey], exact: true });

    return (
        // data for MainScreen query will be refetched once modal is closed
        <Modal fullscreen={true} isOpen={modalState?.open} fade={false} onClosed={resetPortfolioScreenQuery}>
			<GoBackButtonStyled onClick={() => modalState?.setOpen(false)}>
				<ArrowLeft />
			</GoBackButtonStyled>
            <ModalHeader style={{ borderBottom: "none", justifyContent: "center", paddingTop: 0, marginBottom: 20 }}>
				<HeaderStyled>{Vocab.CreatePortfolioRu}</HeaderStyled>
			</ModalHeader>
            <ModalBody>
                <CreatePortfolioScreen />
            </ModalBody>
        </Modal>
    );
}

// [== STYLES ==]
const GoBackButtonStyled = styled.button`
	position: absolute;
	top: 25px;
	left: 5px;
	border: none;
	padding: 0;
	cursor: pointer;
`;

const HeaderStyled = styled.div`
    font-weight: 600;
    font-size: 25px;
    width: 100%;
    text-align: center;

`;