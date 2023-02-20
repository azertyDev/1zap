import React from "react";
import s from "./index.module.scss";


import {Title} from "components/ui/title";
import {SearchTabs} from "components/ui/search/tabs";
import {InputSelectWrTabs} from "components/ui/input/input_filter_wr_tabs";
import {useHandleActivetTabHome} from "src/hooks/search_home/useHandleActivetTabHome";
import {useTranslation} from "next-i18next";
import {FilterSelect} from "components/ui/filter/filter_selections/filter_select";
import {FilterSelections} from "components/ui/filter/filter_selections";


import {useRouter} from "next/router";
import {TableRow} from "components/ui/table/table_row";
import {TableElement} from "components/ui/table/table_element";
import Image from "next/image";
import {OilTabs} from "src/constants/oilTabs";
import {Pagination} from "components/ui/pagination/Pagination";
import {useFilter} from "src/hooks/common/useFilter";

export const Oil = (): JSX.Element => {
    const {activeTab, handleActivetab} = useHandleActivetTabHome();
    const {handleFilter}= useFilter();

    const {t} = useTranslation();

    const {
        query: {
            producer,
            oilType,
            stickType,
            volume,
        },
    } = useRouter();


    return <>

        <Title main className={s.title}>
            {t("common:oilCat")}
        </Title>

        <div className={s.tabs_wr}>
            <SearchTabs
                activeTab={activeTab}
                handleTab={handleActivetab}
                tabsRes={OilTabs}
                tabs={OilTabs}
            >
                <InputSelectWrTabs>
                    <FilterSelections>
                        <FilterSelect
                            id={'producer'}
                            title={t('filter:producer')}
                            value={
                                (producer ??
                                    'Aaaaaaaaaaaaaaaaaaaa') as string
                            }
                            fun={handleFilter}
                            labelAlt={'Aaaaaaaaaaaaaaaaaaaa'}
                            options={[
                                {
                                    value: 'Aaaaaaaaaaaaaaaaaaaa',
                                    label: 'Aaaaaaaaaaaaaaaaaaaa',
                                },
                                {value: 'b', label: 'b'},
                            ]}
                        />
                        <FilterSelect
                            id={'oilType'}
                            title={t('filter:oilType')}
                            value={(oilType ?? 'a') as string}
                            fun={handleFilter}
                            labelAlt={'a'}
                            options={[
                                {value: 'a', label: 'a'},
                                {value: 'b', label: 'b'},
                            ]}
                        />
                        <FilterSelect
                            id={'stickType'}
                            title={t('filter:stickType')}
                            value={(stickType ?? 'a') as string}
                            fun={handleFilter}
                            labelAlt={'a'}
                            options={[
                                {value: 'a', label: 'a'},
                                {value: 'b', label: 'b'},
                            ]}
                        />

                        <FilterSelect
                            id={'volume'}
                            title={t('filter:volume')}
                            value={(volume ?? 'a') as string}
                            fun={handleFilter}
                            labelAlt={'a'}
                            options={[
                                {value: 'a', label: 'a'},
                                {value: 'b', label: 'b'},
                            ]}
                        />
                    </FilterSelections>
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
                    {t('filter:typeAndStick')}
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

        <Pagination pageCount={12}/>

    </>

}