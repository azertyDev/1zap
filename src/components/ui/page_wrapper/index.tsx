import React, {FC, PropsWithChildren} from "react";

import s from "./index.module.scss"

export const PageWrapper: FC<PropsWithChildren> = ({children}) => {
    return <div className={s.wr}>
        {children}
    </div>
}