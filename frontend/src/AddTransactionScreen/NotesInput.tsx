import { UseFormRegister } from "react-hook-form";
import { FormFieldStyled, InputStyled, LabelStyled } from "../Common/forms/styles";
import { AddTransactionFormData } from "./types";
import { Vocab } from "./vocabulary";

interface INotesInputProps {
    readonly register: UseFormRegister<AddTransactionFormData>;
}

export const NotesInput = ({ register }: INotesInputProps): JSX.Element => {
    return (
        <FormFieldStyled>
            <LabelStyled htmlFor="notes">{Vocab.NotesLabelRu}</LabelStyled>
            <InputStyled {...register("notes")} autoComplete="off" />
        </FormFieldStyled>
    )
}