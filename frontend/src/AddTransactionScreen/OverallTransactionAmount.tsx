import { useCallback } from "react";
import { Vocab } from "./vocabulary";
import styled from "styled-components";
import { Black } from "../Common/colors";
import { Big } from "big.js";
import { TransactionType } from "./types";

interface IOverallTransactionAmountProps {
    readonly amount: string;
    readonly pricePerUnit: string;
    readonly commission?: string;
    readonly type: TransactionType;
}

export const OverallTransactionAmount = ({ amount, pricePerUnit, commission, type }: IOverallTransactionAmountProps): JSX.Element => {
    const totalCalculated = useCallback(() => {
        if (!amount || !pricePerUnit) return "";

        try {
            let calculation = new Big(amount).times(new Big(pricePerUnit));
            if (commission) {
                if (type === "Buy") {
                    calculation = calculation.plus(new Big(commission));
                } else if (type === "Sell") {
                    calculation = calculation.minus(new Big(commission));
                }
            }

            return `$${calculation.toString()}`;
        } catch (err) {
            return "";
        }
        
    }, [amount, pricePerUnit, commission, type]);
    
    return (
        <ContainerStyled>
            <LabelStyled>{Vocab.TotalRu}</LabelStyled>
            <TotalCalculatedStyled>{totalCalculated()}</TotalCalculatedStyled>
        </ContainerStyled>
    )
}

// [== STYLES ==]
const ContainerStyled = styled.div`
    margin-top: 35px;
    display: flex;
    gap: 7px;
`;

const LabelStyled = styled.span`
    color: ${Black};
    font-weight: 500;
    font-size: 14px;
    align-self: end;
`;

const TotalCalculatedStyled = styled.span`
    color: ${Black};
    font-weight: 500;
    font-size: 18px;
`;