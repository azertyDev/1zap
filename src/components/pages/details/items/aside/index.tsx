import React, {FC} from "react";
import s from "./index.module.scss";
import Link from "next/link";
import {IconsWrapper} from "components/ui/icons_wrapper";
import {Icon} from "components/ui/icon";
import {useTranslation} from "next-i18next";

export const AsideDetailsCategories: FC<{ children: React.ReactNode; linkBack: string }> = ({children,linkBack}): JSX.Element => {
    const {t} = useTranslation()

    return <aside className={s.aside}>
        <div className={s.aside_top}>
            <Link href={linkBack}>
                <IconsWrapper size={'big'}>
                    <Icon size={22} name={"arrow_back"}/>
                </IconsWrapper>
            </Link>
            <h3 className={s.aside_title}>{t("groupDetails")}</h3>
        </div>

        <ul className={s.list}>
            {children}
        </ul>
    </aside>
}