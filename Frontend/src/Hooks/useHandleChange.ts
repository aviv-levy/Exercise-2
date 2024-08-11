
// This hook handle with onchange input.

import { Dispatch, SetStateAction } from 'react';

export const useHandleChange = <T extends object>(
    setState: Dispatch<SetStateAction<T>>
) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
};