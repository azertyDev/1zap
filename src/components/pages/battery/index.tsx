import React from "react";
import s from "./index.module.scss";

import {detailsTabs} from "src/constants/detailsTabs";

import {Title} from "components/ui/title";
import {SearchTabs} from "components/ui/search/tabs";
import {InputSelectWrTabs} from "components/ui/input/input_filter_wr_tabs";
import {useHandleActivetTabHome} from "src/hooks/search_home/useHandleActivetTabHome";
import {useTranslation} from "next-i18next";



import {TableRow} from "components/ui/table/table_row";
import {TableElement} from "components/ui/table/table_element";
import Image from "next/image";
import {FitParams} from "./fit_params";
import {FirCars} from "./fir_cars";


export const Battery = (): JSX.Element => {
    const {activeTab, handleActivetab} = useHandleActivetTabHome();
    const {t} = useTranslation();


    return <>
        <Title main className={s.title}>
            {t("common:batteryCat")}
        </Title>

        <div className={s.tabs_wr}>
            <SearchTabs
                activeTab={activeTab}
                handleTab={handleActivetab}
                tabsRes={detailsTabs}
                tabs={detailsTabs}
            >
                <InputSelectWrTabs>
                        {activeTab === 1 && (<FitParams/>)}
                        {activeTab === 2 && (<FirCars/>)}
                </InputSelectWrTabs>
            </SearchTabs>
        </div>
        <div className={s.table}>
            <TableRow className={s.table_row}>
                <TableElement className={"table_h"}>
                    {t('filter:producer')}
                </TableElement>
                <TableElement className={"table_h"}>
                    {t('filter:number')}
                </TableElement>
                <TableElement className={"table_h"}>
                    {t('filter:photo')}
                </TableElement>
                <TableElement className={"table_h"}>
                    {t('filter:nameProduct')}
                </TableElement>
                <TableElement className={"table_h"}>
                    {t('filter:size')}
                </TableElement>
                <TableElement className={"table_h"}>
                    {t('filter:middlePrice')}
                </TableElement>
                <TableElement className={"table_h"}>
                    {t('filter:offer')}
                </TableElement>
            </TableRow>
            <TableRow className={s.table_row}>
                <TableElement className={"table_b"}>
                    <h5>GM</h5>
                </TableElement>
                <TableElement className={"table_b"}>
                    <h5>31232131</h5>
                </TableElement>
                <TableElement className={"table_b"}>
                    <Image
                        src={"https://images.unsplash.com/photo-1676296825236-8c06ac83938b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=385&q=80"}
                        alt={"oil"} width={52} height={70}/>
                </TableElement>
                <TableElement className={"table_b"}>
                    <h5>POLYMERIUM XPRO1 5W30 C3 DEXOS2 4L</h5>
                </TableElement>
                <TableElement className={"table_b"}>
                    <h5>5W-30</h5>
                    <p>Синтетическое 5л</p>
                </TableElement>
                <TableElement className={"table_b"}>
                    <h5>$19</h5>
                    <p>от 15$ до 23$</p>
                </TableElement>
                <TableElement className={"table_b"}>
                    <button>
                        {t("common:show")} - 44
                    </button>
                </TableElement>
            </TableRow>
        </div>
    </>
}