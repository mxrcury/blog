import { ChangeEvent, useCallback, useState } from "react";
import { InputValues } from "./types";

interface IUseInput {
    value: InputValues;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    clearInputs: () => void;
    handleInputError: (inputName: string) => void;
    errorCheck: (inputName: string) => boolean;
    handlerErrorMessage: (inputName: string) => string | null;
}

const useInput = (...inputNames: string[]): IUseInput => {
    const [value, setValue] = useState<InputValues>(() => {
        const inputs = inputNames.reduce((allInputs, input) => {
            return { ...allInputs, [input]: { value: "", isError: false, errorMessage: `Please enter a ${input}` } };
        }, {});
        return inputs;
    });
    const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const inputContent = {
            ...value[e.target.name],
            value: e.target.value,
        };
        setValue({
            ...value,
            [e.target.name]: inputContent,
        });
    };
    const clearInputs = useCallback((): void => {
        let inputs = {};
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                inputs = {
                    ...inputs,
                    [key]: {
                        value: "",
                        isError: false,
                        errorMessage: value[key].errorMessage,
                    },
                };
            }
        }
        setValue({ ...inputs });
    }, [value]);
    const handleInputError = useCallback(
        (inputName: string): void => {
            const errorInput = { ...value, [inputName]: { ...value[inputName], isError: true } };
            setValue({ ...errorInput });
        },
        [value]
    );
    const errorCheck = useCallback(
        (inputName: string): boolean => {
            return value[inputName].isError && !value[inputName].value.length;
        },
        [value]
    );
    const handlerErrorMessage = useCallback(
        (inputName: string): string | null => {
            return value[inputName].isError && !value[inputName].value.length ? value[inputName].errorMessage : null;
        },
        [value]
    );

    return {
        value,
        onChange,
        clearInputs,
        handleInputError,
        errorCheck,
        handlerErrorMessage,
    };
};

export default useInput;
