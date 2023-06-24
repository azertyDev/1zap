import { FC } from 'react';

import s from './index.module.scss';

import { useTranslation } from 'next-i18next';

import { Container } from 'components/ui/container';
import { DetailCategoriesWr } from 'components/pages/details/items/wrapper';
import { AsideDetailsCategories } from 'components/pages/details/items/aside';
import { ContentDetailsCategories } from 'components/pages/details/items/content';

import { PageWrapper } from 'components/ui/page_wrapper';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDetailChosenCateg } from 'src/hooks/laximoData/useDetailChosenCateg';

export const DetailsChosenCategories: FC<{ dataAuto: string; dataList: string }> = ({ dataList, dataAuto }) => {
    const { t } = useTranslation('common');

    const {
        query: { Catalog, Vid },
    } = useRouter();

    const { auto, list } = useDetailChosenCateg(dataAuto, dataList);

    return (
        <PageWrapper>
            <Container>
                {auto && list && (
                    <DetailCategoriesWr title={`${auto?.brand} ${auto?.name}`}>
                        <AsideDetailsCategories>
                            <p className={s.field_name}>{list.map((item) => item?.$.name)}</p>
                            <div className={s.line}></div>

                            <ul>
                                {list.map((item) => {
                                    return item.Unit.map((subitem) => {
                                        return (
                                            <li key={subitem.$.name}>
                                                <Link
                                                    href={`/details/chosen_detail?Catalog=${Catalog}&Vid=${Vid}&sd=${subitem.$.ssd}&unit=${subitem.$.unitid}`}
                                                >
                                                    {subitem.$.code}
                                                    {subitem.$.name}
                                                </Link>
                                            </li>
                                        );
                                    });
                                })}
                            </ul>
                        </AsideDetailsCategories>
                        <div className={s.items_wr}>
                            {list.map((item) => {
                                return (
                                    <ContentDetailsCategories title={item?.$.name} key={item?.$.name}>
                                        {item.Unit.map((unit) => {
                                            return (
                                                <div key={unit.$.name} className={s.box_item}>
                                                    <Link
                                                        className={s.box_item_link}
                                                        href={`/details/chosen_detail?Catalog=${Catalog}&Vid=${Vid}&sd=${unit.$.ssd}&unit=${unit.$.unitid}`}
                                                    ></Link>
                                                    <h5 className={s.box_item_title}>
                                                        {unit.$.code}
                                                        {unit.$.name}
                                                    </h5>
                                                    <div className={s.box_item_img_wr}>
                                                        <Image
                                                            src={unit.$.imageurl?.replace('%size%', 'source')}
                                                            alt={''}
                                                            fill
                                                            quality={70}
                                                            sizes="214"
                                                            priority
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </ContentDetailsCategories>
                                );
                            })}
                        </div>
                    </DetailCategoriesWr>
                )}
            </Container>
        </PageWrapper>
    );
};
