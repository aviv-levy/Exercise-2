import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

function ConnectionLayout({ children }: Props) {
    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark m-9">
            <div className="flex flex-wrap items-center">
                {children}
            </div>
        </div>
    );
}

export default ConnectionLayout;