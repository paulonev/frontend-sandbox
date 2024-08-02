import { Modal, ModalBody, ModalHeader } from "reactstrap";
import CreatePortfolioScreen from "../СreatePortfolioScreen";
import { useModalState } from "../Common/ModalStateProvider";
import styled from "styled-components";
import { PortfolioCardTheme } from "../MainScreen/PortfolioCardTheme";

export const CreatePortfolioModal = () => {
    const modalState = useModalState("createPortfolio");

    const closeBtn = (
        <CloseButtonStyled onClick={() => modalState?.setOpen(false)}>
          &times;
        </CloseButtonStyled>
    );

    return (
        <Modal fullscreen={true} isOpen={modalState?.open} fade={false}>
            <ModalHeader close={closeBtn} />
            <ModalBody>
                <CreatePortfolioScreen />
            </ModalBody>
        </Modal>
    );
}

// [== STYLES ==]
const CloseButtonStyled = styled.button`
    overflow: hidden;
	position: relative;
	border: none;
	padding: 0;
	width: 2em; height: 2em;
	border-radius: 50%;
	background: transparent;
	color: ${PortfolioCardTheme.main.bgColor};
	font: inherit;
	text-indent: 100%;
	cursor: pointer;
	
	&:focus {
		outline: solid 0 transparent;
		box-shadow: 0 0 0 2px #8ed0f9
	}
	
	&:hover {
		background: rgba(29, 161, 142, .1)
	}
	
	&:before, &:after {
		position: absolute;
		top: 15%; left: calc(50% - .0625em);
		width: .125em; height: 70%;
		border-radius: .125em;
		transform: rotate(45deg);
		background: currentcolor;
		content: ''
	}
	
	&:after { transform: rotate(-45deg); }
`;