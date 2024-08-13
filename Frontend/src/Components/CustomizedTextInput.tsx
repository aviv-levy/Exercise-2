import { Dispatch, SetStateAction } from "react";
import { useHandleChange } from "../Hooks/useHandleChange";

interface Props {
    label?: string,
    type: "text" | "number" | "password"
    name: string,
    placeholder?: string,
    value: string | number,
    errorText?: string,
    setState: Dispatch<SetStateAction<any>>
}


function CustomizedTextInput({ label, type, name, placeholder, value,errorText, setState }: Props) {

    const handleChange = useHandleChange(setState);

    return (
        <div className="relative z-0 w-full mb-4 group">
            <label className="mb-2.5 block font-medium text-black dark:text-white">
                {label}
            </label>
            <div className="relative">
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    onChange={handleChange}
                />
            </div>
            <div className='text-red-600 text-center'>{errorText}</div>
        </div>
    );
}

export default CustomizedTextInput;