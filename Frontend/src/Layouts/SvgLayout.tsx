import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

function SVGLayout({children}:Props) {
    return (
        <div className="hidden w-full xl:block xl:w-1/2">
            <div className="py-17.5 px-26 text-center">
                {children}
            </div>
        </div>
    );
}

export default SVGLayout;