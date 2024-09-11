import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useModalState } from "../Common/ModalStateProvider";
import styled from "styled-components";
import { ArrowLeft } from "../Common/components/ArrowLeft";
import PortfolioScreen from "../PortfolioScreen";
import { PortfolioItem } from "../MainScreen/types";
import { BodyBackgroundColor } from "../Common/colors";

interface IPortfolioViewModalProps {
    readonly selectedPortfolio: PortfolioItem | null;
    readonly onClose: () => void;
}

export const PortfolioViewModal = (props: IPortfolioViewModalProps) => {
    const modalState = useModalState("specificPortfolio");

    const onGoBackClick = () => {
        modalState?.setOpen(false);
        props.onClose();
    }

    if (!props.selectedPortfolio) {
        return <></>;
    }

    return (
        <Modal fullscreen={true} isOpen={modalState?.open} fade={false}>
			<GoBackButtonStyled onClick={onGoBackClick}>
				<ArrowLeft />
			</GoBackButtonStyled>
            <ModalHeader style={{ borderBottom: "none", paddingTop: 25, paddingLeft: 50 }} tag={"span"}>
				<HeaderStyled>{props.selectedPortfolio.name}</HeaderStyled>
			</ModalHeader>
            <ModalBody style={{ paddingTop: 0, color: BodyBackgroundColor }}>
                <PortfolioScreen id={props.selectedPortfolio.id} />
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
    font-size: 20px;
    width: 100%;
`;