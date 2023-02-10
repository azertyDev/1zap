import s from "./index.module.scss";
import {FC, PropsWithChildren} from "react";

export const TableElement: FC<PropsWithChildren & { className: string }> = (props) => {
    const {children, className} = props

    return <div className={`${s.table_el} ${s[className]}`}>
        {children}
    </div>
}