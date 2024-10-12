import styled from "styled-components";
import { AppGlobalCurrencyCode } from "../constants";
import { formatPrice } from "../Common/formatter";
import { AddButton } from "../Common/components/AddButtonSvg";
import { Black } from "../Common/colors";
import { useModalState } from "../Common/ModalStateProvider";

interface IPortfolioBalanceRecordProps {
    readonly volume: number;
    readonly currencyCode: string | null | undefined;
}

export const PortfolioBalanceRecord = ({ volume, currencyCode }: IPortfolioBalanceRecordProps): JSX.Element => {
    const modalState = useModalState("addCurrencyTransaction");

    const onAddCurrentTransactionClicked = () => {
        if (modalState) {
            const { open, setOpen } = modalState;
            setOpen(!open);
        }
    }
    
    return (
        <GridContainerStyled>
            <BalanceVolumeSectionStyled>
                <CurrencyCodeStyled>{currencyCode}</CurrencyCodeStyled>
                <VolumeStyled>{formatPrice(volume, currencyCode ?? AppGlobalCurrencyCode)}</VolumeStyled>
            </BalanceVolumeSectionStyled>
            <AddBalanceButtonContainerStyled onClick={onAddCurrentTransactionClicked}>
                <AddButton />
            </AddBalanceButtonContainerStyled>
        </GridContainerStyled>
    );
}

// [== STYLES ==]
const GridContainerStyled = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.1fr;
    grid-template-rows: 0.1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
`;

const BalanceVolumeSectionStyled = styled.div`
    grid-area: 1 / 1 / 2 / 2;
    color: ${Black};
    display: flex;
    align-items: center;
    gap: 13px;
`;

const AddBalanceButtonContainerStyled = styled.button`
    grid-area: 1 / 2 / 2 / 3;
    display: flex;
    justify-content: flex-end;
    background-color: transparent;
    padding: 0;
`;

const CurrencyCodeStyled = styled.span`
    font-size: 16px;
    font-weight: 500;
`;
const VolumeStyled = styled.span`
    font-size: 18px;
    font-weight: 600;
`;