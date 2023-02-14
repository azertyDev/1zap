import React from "react";


import s from "./index.module.scss";

import {useTranslation} from "next-i18next";
import Link from "next/link";

import {Container} from "components/ui/container";
import {DetailCategoriesWr} from "components/pages/details/items/wrapper";
import {AsideDetailsCategories} from "components/pages/details/items/aside";
import {ContentDetailsCategories} from "components/pages/details/items/content";
import {DetailCategoryItem} from "components/pages/details/items/content_item";
import {PageWrapper} from "components/ui/page_wrapper";


export const DetailsCategories = () => {

    const {t} = useTranslation("common");

    return <PageWrapper>
        <Container>
            <DetailCategoriesWr title={"GENTRA (T255) (2006 - 2011)"}>
                <AsideDetailsCategories linkBack={"/details"}>
                    <li className={s.active_aside}>
                        Внутреннее оборудование
                    </li>
                    <li>
                        Двигатель
                    </li>
                </AsideDetailsCategories>
                <ContentDetailsCategories  title={"Внутреннее оборудование"}>
                    <DetailCategoryItem title={"Headlining (7310 wq dwq dwq dwq dqwdqw d)"} listOrImg={"list"}/>
                </ContentDetailsCategories>
            </DetailCategoriesWr>
        </Container>
    </PageWrapper>
}