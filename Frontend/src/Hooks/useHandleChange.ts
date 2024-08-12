
// This hook handle with onchange input.

import { Dispatch, SetStateAction } from 'react';

export const useHandleChange = <T extends object>(
    setState: Dispatch<SetStateAction<T>>
) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Check if the element is a select and convert value if necessary
        const newValue = e.target instanceof HTMLSelectElement ? parseInt(value) || value : value;

        setState((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };
};