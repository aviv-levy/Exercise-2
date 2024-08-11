import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

function FormLayout({children}:Props) {
    return (
        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                {children}
            </div>
        </div>
    );
}

export default FormLayout;