/* eslint-disable react-hooks/rules-of-hooks */
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Modals, useModalState } from "../Common/ModalStateProvider";
import styled from "styled-components";
import { Vocab } from "../СreatePortfolioScreen/vocabulary";
import CreatePortfolioScreen from "../СreatePortfolioScreen";
import { ArrowLeft } from "../Common/components/ArrowLeft";
import { BodyBackgroundColor } from "../Common/colors";
import { FC, useRef } from "react";

interface ICreatePortfolioModalProps {
    readonly modalName: Modals;
    readonly onModalClosed: (formSubmitted: boolean) => void;
    readonly onGoBackClicked?: () => void;
    readonly hasPortfolios: boolean;
}

const CreatePortfolioModal = (props: ICreatePortfolioModalProps): FC => 
    () => {
        const goBackClicked = useRef(false);
        const modalState = useModalState(props.modalName);

        const onGoBackClickedInner = () => {
            modalState?.setOpen(false);
            props.onGoBackClicked && props.onGoBackClicked();
            goBackClicked.current = true;
        }

        const onModalClosedInner = () => {
            //modal could be closed either by clicking goBack btn or by submitting the form
            //onModalClosed(true) - means that the modal was closed after the form was submittted
            props.onModalClosed(!goBackClicked.current);
            goBackClicked.current = false;
        }

        return (
            <Modal fullscreen={true} isOpen={modalState?.open} fade={false} onClosed={onModalClosedInner}>
                <ContainerStyled>
                    <GoBackButtonStyled onClick={onGoBackClickedInner}>
                        <ArrowLeft />
                    </GoBackButtonStyled>
                    <ModalHeader style={{ borderBottom: "none", justifyContent: "center", paddingTop: 0, marginBottom: 20 }}>
                        <HeaderStyled>{Vocab.CreatePortfolioRu}</HeaderStyled>
                    </ModalHeader>
                    <ModalBody>
                        <CreatePortfolioScreen hasPortfolios={props.hasPortfolios} modalName={props.modalName} />
                    </ModalBody>
                </ContainerStyled>
            </Modal>
        );
}

export default CreatePortfolioModal;

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
    font-size: 25px;
    width: 100%;
    text-align: center;

`;