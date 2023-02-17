import {Title} from "components/ui/title";

import s from "./index.module.scss";

import React, {FC} from "react";

export const DetailCategoriesWr: FC<{ children: React.ReactNode; title: string }> = ({children, title}) => {
    return <div>
        <Title main className={s.title}>
            {title}
        </Title>
        <div className={s.inner}>
            {children}
        </div>

    </div>
}