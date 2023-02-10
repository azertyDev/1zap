import s from "./index.module.scss";

import {FC, HtmlHTMLAttributes, PropsWithChildren} from "react";


export const TableRow: FC<PropsWithChildren & { className: string }> = (props) => {
    const {children,className}= props
    return <div className={`${s.table_row} ${className}`}>
        {children}
    </div>
}