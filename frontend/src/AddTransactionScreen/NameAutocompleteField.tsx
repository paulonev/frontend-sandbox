import { FieldError } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { AutocompleteInput } from "./AutocompleteInput";
import { usePopularCoins } from "./PopularCoinsProvider";
import { Vocab } from "./vocabulary";
import { CoinOptions } from "../Api/coinSearch.schema";

const DefaultFetchCount: number = 50;

export const requestDelayInMilliseconds: number = 500;

const fetchCoins = debounce(
    async (
        inputValue: string,
        onRequestFulfilled: (data: CoinOptions) => void,
        onRequestFailed: () => void
    ): Promise<void> => {
        try {
            throw new Error(`fetch is missing, params { DefaultFetchCount: ${DefaultFetchCount}, inputValue: ${inputValue}, onRequestFulfilled: ${onRequestFulfilled} }`);
        } catch (error) {
            onRequestFailed();
            console.error(error);
        }
    },
    requestDelayInMilliseconds
);

interface INameAutocompleteFieldProps {
    readonly errors: FieldError | undefined;
    readonly handleOnChange: (selectedOption: CoinOptions[0] | null) => void;
}

export const NameAutocompleteField = ({ errors, handleOnChange }: INameAutocompleteFieldProps): JSX.Element => {
    const popularCoins = usePopularCoins();
    
    const [coinOptions, setCoinOptions] = useState<CoinOptions>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [searching, setSearching] = useState<boolean>(false);

    const noOptionsText = useCallback((): string => {
        if (searching) {
            return Vocab.SearchingRu;
        } else if (coinOptions.length === 0 && inputValue) {
            return Vocab.NothingFoundRu;
        } else return '';
    }, [searching, coinOptions.length, inputValue]);

    const handleOnInputChange = (value: string) => {
        // ensure that api call is made only in case user types in search field
        // and not made when:
        // - user selects any coin from dropdown
        if (value) {
            setSearching(!coinOptions.some(c => c.coinName === value));
        }
        else if (popularCoins === undefined) {
            throw new Error("Popular coins failed to fetch");
        }
        else {
            setCoinOptions(popularCoins);
        }

        setInputValue(value);
    }

    const handleOnChangeInner = (selectedOption: CoinOptions[0] | null) => {
        handleOnChange(selectedOption);
        setCoinOptions(selectedOption ? [selectedOption] : []);
    }
    
    // function to sync with external state 
    // returns data based on input
    // in case input = "", data is returned from the context 
    useEffect(() => {
        let ignore = false;
        if (!inputValue) {
            if (popularCoins === undefined) {
                throw new Error("Popular coins failed to fetch");
            }

            setCoinOptions(popularCoins);
            setSearching(false);
        }
        else if (searching) {
            fetchCoins(
                inputValue,
                (data: CoinOptions) => {
                    if (!ignore) {
                        setCoinOptions(data);
                        setSearching(false);
                    }
                },
                () => {
                    if (!ignore) {
                        setCoinOptions([] as CoinOptions);
                        setSearching(false);
                    }
                }
            );
        }

        return () => {
            ignore = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searching, inputValue]);

    return (
        <AutocompleteInput
            options={coinOptions}
            errors={errors}
            handleOnChange={handleOnChangeInner}
            handleOnInputChange={handleOnInputChange} 
            inputValue={inputValue}
            noOptionsText={noOptionsText}
        />
    );
}
