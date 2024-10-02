import { FieldError } from "react-hook-form";
import { useAutocomplete, createFilterOptions } from "@mui/base";
import { Vocab } from "./vocabulary";
import styled from "styled-components";
import { Black, Red } from "../Common/colors";
import { FormFieldStyled, InputStyled, LabelStyled } from "../Common/forms/styles";
import { textValidationWrapper } from "../Common/utils/textValidation.utils";
import { CoinOptions } from "../Api/coinSearch.schema";

interface IAutocompleteInputProps {
    readonly errors: FieldError | undefined;
    readonly options: CoinOptions;
    readonly handleOnChange: (selectedOption: CoinOptions[0] | null) => void;
    readonly handleOnInputChange: (value: string) => void;
    readonly inputValue: string;
    readonly noOptionsText: string | (() => string);
}

export const AutocompleteInput = ({ errors, options, handleOnChange, handleOnInputChange, inputValue, noOptionsText }: IAutocompleteInputProps): JSX.Element => {
    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
    } = useAutocomplete({
        id: "coins-autocomplete",
        options,
        getOptionLabel: (option) => option.coinName,
        onChange: (_, value) => {
            handleOnChange(value);
        },
        onInputChange: (_, value) => {
            textValidationWrapper(handleOnInputChange)(value);
        },
        inputValue,
        filterOptions: createFilterOptions({
            stringify: (option) => `${option.coinName}${option.coinTicker}`
        })
    });

    return (
        <FormFieldStyled {...getRootProps()}>
            <LabelStyled {...getInputLabelProps()} htmlFor="coinName">{Vocab.AssetNameRu}</LabelStyled>
            <InputStyled {...getInputProps()} aria-invalid={errors ? "true" : "false"} placeholder={Vocab.AssetNamePlaceholderRu}/>
            <ListboxStyled {...getListboxProps()}>
                {groupedOptions.length > 0 ? (groupedOptions as CoinOptions).map((option, index) => {
                    const optionProps = getOptionProps({ option, index });
                    return (
                        <ListItemStyled {...optionProps} key={`coin-${index}`}>
                            <img src={option.webp64 ?? ""} style={{ maxWidth: "100%", height: 22, objectFit: "contain" }} />
                            <CoinNameStyled>{option.coinName}</CoinNameStyled>
                            <CoinTickerStyled>{option.coinTicker}</CoinTickerStyled>
                        </ListItemStyled>
                    );
                }) : options.length === 0 ? ( 
                    <ListItemStyled key="empty">
                        <EmptyDropdownTextStyled>
                            {typeof noOptionsText === "function" ? noOptionsText() : noOptionsText}
                        </EmptyDropdownTextStyled>
                    </ListItemStyled>
                ) : null}
            </ListboxStyled>
            {errors?.message && (
                <ErrorTextStyled role="alert">{errors?.message}</ErrorTextStyled>
            )}
        </FormFieldStyled>
    );
}

// [== STYLES ==]
const ErrorTextStyled = styled.p`
    color: ${Red};
    font-size: 14px;
    margin-top: 5px;
`;

const ListboxStyled = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
    background-color: #fff;
    overflow: auto;
    position: absolute;
    max-width: 343px;
    width: 100%;
    border-radius: 12px;
    box-sizing: border-box;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    max-height: 430px;
    overflow-y: scroll;
    z-index: 1;
`;
// '& li.Mui-focused': {
//     backgroundColor: '#4a8df6',
//     color: 'white',
//     cursor: 'pointer',
//   },

const ListItemStyled = styled.li`
    padding: 7px;
    display: flex;
    align-items: center;
`;
// &:active {
//     background-color: #2977f5;
//     color: ${White};
//   }

const CoinNameStyled = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: ${Black};
    margin-left: 10px;
`;

const CoinTickerStyled = styled.span`
    font-size: 12px;
    font-weight: 500;
    color: #575757;
    margin-left: 10px;
    margin-top: 4px;
`;

const EmptyDropdownTextStyled = styled.p`
    font-size: 11px;
    font-weight: 500;
    margin-left: 11px;
`;