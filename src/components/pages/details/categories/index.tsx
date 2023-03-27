import { FC, useCallback, useState } from 'react';

import s from './index.module.scss';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { Container } from 'components/ui/container';
import { DetailCategoriesWr } from 'components/pages/details/items/wrapper';
import { AsideDetailsCategories } from 'components/pages/details/items/aside';
import { ContentDetailsCategories } from 'components/pages/details/items/content';
import { PageWrapper } from 'components/ui/page_wrapper';
import { useRouter } from 'next/router';
import { useDetailCategories } from 'src/hooks/laximoData/useDetailCategories';

export const DetailsCategories: FC<{ dataAuto: string; dataList: string }> = ({ dataList, dataAuto }) => {
    const { t } = useTranslation('common');
    const {
        query: { Catalog, Vid, sd },
    } = useRouter();

    const { list, auto } = useDetailCategories(dataAuto, dataList);
    const [listId, setListId] = useState(0);

    const handleListId = useCallback((val: number) => {
        return () => setListId(val);
    }, []);

    return (
        <PageWrapper>
            <Container>
                {auto && list && (
                    <DetailCategoriesWr title={`${auto?.brand} ${auto?.name}`}>
                        <AsideDetailsCategories>
                            {list.titles.map((item, index) => {
                                return (
                                    <li
                                        className={listId === index ? s.active_aside : ''}
                                        key={item}
                                        onClick={handleListId(index)}
                                    >
                                        {item}
                                    </li>
                                );
                            })}
                        </AsideDetailsCategories>

                        <ContentDetailsCategories title={list.titles[listId]}>
                            {list?.filteredRows[listId].map((item, index) => {
                                return (
                                    <div className={s.content_item} key={index}>
                                        {item.map((subitem, index) => {
                                            return (
                                                <div key={subitem.name + subitem.quickgroupid}>
                                                    {subitem.link === 'true' ? (
                                                        <Link
                                                            className={
                                                                index === 0
                                                                    ? s.content_item_title_small
                                                                    : s.content_item_link
                                                            }
                                                            href={`/details/chosen_category?id=${subitem.quickgroupid}&Catalog=${Catalog}&Vid=${Vid}&sd=${sd}`}
                                                        >
                                                            {subitem.name}
                                                        </Link>
                                                    ) : (
                                                        <div
                                                            className={
                                                                index === 0
                                                                    ? s.content_item_title_small
                                                                    : s.content_item_link
                                                            }
                                                        >
                                                            {subitem.name}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </ContentDetailsCategories>
                    </DetailCategoriesWr>
                )}
            </Container>
        </PageWrapper>
    );
};
