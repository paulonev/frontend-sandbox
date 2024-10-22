import { Control, Controller } from "react-hook-form";
import { NewPortfolioFormData } from "./types";
import { FormGroup, Input, Label } from "reactstrap";
import { Vocab } from "./vocabulary";
import { FormFieldStyled } from "../Common/forms/styles";
import styled from "styled-components";
import { Black } from "../Common/colors";

interface IMainPortfolioSwitchProps {
    readonly control: Control<NewPortfolioFormData>;
    readonly disabled: boolean;
}

export const MainPortfolioSwitch = ({ control, disabled }: IMainPortfolioSwitchProps): JSX.Element => {
    return (
        <Controller 
            name="isMainPortfolio"
            control={control}
            render={({ field: { onChange, onBlur, name, value, ref }}) => (
                <FormFieldStyled>
                    <FormGroup switch row style={{ paddingLeft: 0 }}>
                        <Label check style={{ fontSize: 16, fontWeight: 600 }}>{Vocab.MainPortfolioSwitchRu}</Label>
                        <Input
                            type="switch"
                            role="switch"
                            onChange={onChange}
                            onBlur={onBlur}
                            name={name}
                            checked={value}
                            innerRef={ref}
                            style={{ float: "right", minHeight: 22, width: 40 }}
                            disabled={disabled}
                        />
                        {disabled && (
                            <InfoParagraphStyled>{Vocab.FirstPortfolioShouldBeMainWarningRu}</InfoParagraphStyled>
                        )}
                    </FormGroup>
                </FormFieldStyled>
            )}
        />
    )
}

// [== STYLES ==]
const InfoParagraphStyled = styled.p`
    color: ${Black};
    font-size: 11px;
    margin-top: 5px;
`;