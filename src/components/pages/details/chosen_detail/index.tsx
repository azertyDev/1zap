import s from "./index.module.scss";
import {Container} from "components/ui/container";
import {Title} from "components/ui/title";
import {IconsWrapper} from "components/ui/icons_wrapper";
import {PageWrapper} from "components/ui/page_wrapper";
import {Icon} from "components/ui/icon";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import {TableRow} from "components/ui/table/table_row";
import {TableElement} from "components/ui/table/table_element";
import {useTranslation} from "next-i18next";


export const ChosenDetail = (): JSX.Element => {
    const {t} = useTranslation();

    return <PageWrapper>
        <Container>
            <Title main className={s.title}>
                GENTRA (T255) (2006 - 2011)
            </Title>
            <div className={s.inner}>
                <div className={s.img_wr}>
                    <Link className={s.link} href={"/details/categories/chosen_category"}>
                        <IconsWrapper size={'big'}>
                            <Icon size={22} name={"arrow_back"}/>
                        </IconsWrapper>
                    </Link>
                    <div className={s.img}>
                        <Image
                            src={"https://images.unsplash.com/photo-1674924428961-f106fb5d91c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"}
                            fill
                            objectFit={"cover"}
                            alt={"detail"}/>
                    </div>
                </div>
                <div className={s.table}>
                    <h5 className={s.table_title}>Задняя полка i (7320)</h5>
                    <TableRow className={s.table_row}>

                        <TableElement className={"table_h"}>
                            №
                        </TableElement>
                        <TableElement className={"table_h"}>
                            {t('filter:number')}
                        </TableElement>
                        <TableElement className={"table_h"}>

                        </TableElement>
                    </TableRow>
                    <TableRow className={s.table_row}>
                        <TableElement className={"table_b"}>
                            <h5>1</h5>
                        </TableElement>
                        <TableElement className={"table_b"}>
                            <h5>Полка а-задн панл, верхн , [k7]</h5>
                            <p>95220867</p>
                        </TableElement>
                        <TableElement className={"table_b"}>
                            <button>
                                {t("common:find")}
                            </button>
                        </TableElement>
                    </TableRow>
                </div>
            </div>
        </Container>
    </PageWrapper>
}