import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FormFieldStyled, InputStyled, LabelStyled } from "./styles";

interface INotesInputProps<T extends FieldValues> {
    readonly register: UseFormRegister<T>;
    readonly name: Path<T>;
    readonly label: string;
}

export const NotesInput = <T extends FieldValues>({ register, name, label }: INotesInputProps<T>): JSX.Element => {
    return (
        <FormFieldStyled>
            <LabelStyled htmlFor={name}>{label}</LabelStyled>
            <InputStyled {...register(name)} autoComplete="off" />
        </FormFieldStyled>
    )
}