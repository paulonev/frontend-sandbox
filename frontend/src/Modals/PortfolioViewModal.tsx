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
            <ContainerStyled>
                <GoBackButtonStyled onClick={onGoBackClick}>
                    <ArrowLeft />
                </GoBackButtonStyled>
                <ModalHeader style={{ borderBottom: "none", paddingTop: 25, paddingLeft: 50 }} tag={"span"}>
                    <HeaderStyled>{props.selectedPortfolio.name}</HeaderStyled>
                </ModalHeader>
                <ModalBody style={{ paddingTop: 0 }}>
                    <PortfolioScreen id={props.selectedPortfolio.id} />
                </ModalBody>
            </ContainerStyled>
        </Modal>
    );
}

// [== STYLES ==]
const ContainerStyled = styled.div`
    background-color: ${BodyBackgroundColor};
    height: inherit;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const GoBackButtonStyled = styled.button`
	position: absolute;
	top: 25px;
	left: 5px;
	border: none;
	padding: 0;
	cursor: pointer;
    background-color: inherit;
`;

const HeaderStyled = styled.div`
    font-weight: 600;
    font-size: 20px;
    width: 100%;
`;