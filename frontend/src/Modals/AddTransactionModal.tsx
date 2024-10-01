import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useModalState } from "../Common/ModalStateProvider";
import styled from "styled-components";
import { Vocab } from "../AddTransactionScreen/vocabulary";
import AddTransactionScreen from "../AddTransactionScreen";
import { ArrowLeft } from "../Common/components/ArrowLeft";
import { useQueryClient } from "@tanstack/react-query";
import { PortfolioScreenQueryKey } from "../constants";
import { BodyBackgroundColor } from "../Common/colors";
import { useForm } from "react-hook-form";
import { AddTransactionFormData, defaultValues } from "../AddTransactionScreen/types";
import { telegram_showConfirm, telegram_isVersionAtLeast, telegram_isClientEnabled } from "../Telegram/utils";

export const AddTransactionModal = ({ portfolioId }: { portfolioId: number }) => {
    const queryClient = useQueryClient();
    const modalState = useModalState("addTransaction");

    const form = useForm<AddTransactionFormData>({ defaultValues });

    const onCloseClicked = () => {
        // initParams are initialized only within telegram client, where showConfirm should run
        // otherwise tgWebVersion is 6.0 and showConfirm is not available, so just closing the modal and clearing the form
        if (Object.entries(form.formState.dirtyFields).length === 0) {
            modalState?.setOpen(false);
            form.reset();
            return;
        }

        if (telegram_isClientEnabled() && telegram_isVersionAtLeast("6.2"))  {
            telegram_showConfirm(Vocab.RemovingUnsavedChangesWarningRu, (confirmed: boolean) => {
                if (confirmed) {
                    modalState?.setOpen(false);
                    form.reset();
                }
            });
            return;
        } else {
            modalState?.setOpen(false);
            form.reset();
        }
    }

    //reset PortfolioScreen query to its pre-loaded (null in our case) state, and refetch the query since it's active
    const resetPortfolioScreenQuery = () =>
        queryClient.resetQueries({ queryKey: [PortfolioScreenQueryKey] });

    return (
        // data for PortfolioScreen query will be refetched once modal is closed
        <Modal fullscreen={true} isOpen={modalState?.open} fade={false} onClosed={resetPortfolioScreenQuery}>
			<ContainerStyled>
                <GoBackButtonStyled onClick={onCloseClicked}>
                    <ArrowLeft />
                </GoBackButtonStyled>
                <ModalHeader style={{ borderBottom: "none", justifyContent: "center", paddingTop: 0, marginBottom: 20 }}>
                    <HeaderStyled>{Vocab.AddTransactionRu}</HeaderStyled>
                </ModalHeader>
                <ModalBody>
                    <AddTransactionScreen form={form} portfolioId={portfolioId}/>
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
    font-size: 22px;
    width: 100%;
    text-align: center;
`;