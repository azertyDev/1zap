import dayjs from 'dayjs';
import React, { FC, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Table } from 'src/components/ui/dashboard/table';
import { Button } from 'src/components/ui/button';
import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { Pagination } from 'components/ui/pagination/Pagination';
import { promoApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { useModal } from 'src/hooks/common/useModal';
import { BaseModal } from 'components/ui/dashboard/modal/base_modal';
import { useSortDataAdminProvider } from 'src/hooks/common/useSortDataAdminProvider';

export const PromoPage: FC = () => {
    const {
        locale,
        query: { page },
    } = useRouter();
    const [changeData, setChangeData] = useState<any>(null);
    const [activeData, setActiveData] = useState<any>(null);
    const [comment, setComment] = useState('');
    const [trigger, setTrigger] = useState(false);
    const { open, handleModalClose, handleModalOpen } = useModal();
    const { sortBy, sortType, handleSortProducts } = useSortDataAdminProvider();
    const {
        sortBy: sortByApproved,
        sortType: sortTypeApproved,
        handleSortProducts: handleSortProductsApproved,
    } = useSortDataAdminProvider();

    const { t } = useTranslation();

    const handleComment = useCallback((val: string) => {
        return () => {
            handleModalOpen();
            setComment(val);
        };
    }, []);

    const deletePromo = useCallback((id: number) => {
        return () => {
            promoApi
                .deletePromoByProvider(id)
                .then((res) => {
                    setTrigger((prev) => !prev);
                    toast.success(t('dashboard:promo_deleted'));
                })
                .catch((err) => toast.error(t('helpers:error_sending')));
        };
    }, []);

    useEffect(() => {
        (() => {
            promoApi
                .getBlockedPromoByProvider(sortType, sortBy)
                .then((res) => setChangeData(res))
                .catch((err) => toast.error(t('helpers:error_getting')));
        })();
    }, [trigger, sortBy]);

    useEffect(() => {
        (() => {
            promoApi
                .getActivePromoByProvider((page ?? '1') as string, sortTypeApproved, sortByApproved)
                .then((res) => setActiveData(res))
                .catch((err) => toast.error(t('helpers:error_getting')));
        })();
    }, [page, sortTypeApproved, sortByApproved]);

    const colsChange = [
        {
            Header: t('dashboard:date'),
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YY'),
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
            typeProperty: 'date',
            maxWidth: 70,
            minWidth: 70,
        },
        {
            Header: t('dashboard:promo_type'),
            accessor: 'type',
            disableSortBy: true,
            maxWidth: 120,
            disableFilters: true,
            Cell: ({ cell }: any) => t(`dashboard:promo_type_texts.${cell.value}`) as any,
        },
        {
            Header: t('dashboard:reason'),
            accessor: 'blockedReason',
            disableSortBy: true,
            disableFilters: true,
            minWidth: 200,
            Cell: ({ cell }: any) => t(`dashboard:reasons_reject_promo.${cell.value}`) as any,
        },
        {
            Header: t('dashboard:comment'),
            disableFilters: true,
            disableSortBy: true,
            maxWidth: 100,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Button variant="primary" fullWidth onClick={handleComment(cell.description)}>
                            {t('common:open')}
                        </Button>
                    </ActionsBlock>
                );
            },
        },
        {
            Header: t('dashboard:info'),
            disableFilters: true,
            disableSortBy: true,
            maxWidth: 100,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Link href={`/cabinet/promo/edit?id=${cell.id}`}> {t('dashboard:change')}</Link>
                    </ActionsBlock>
                );
            },
        },
        {
            Header: t('dashboard:delete'),
            disableFilters: true,
            disableSortBy: true,
            maxWidth: 100,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Button variant="primary" fullWidth onDoubleClick={deletePromo(cell.id)}>
                            {t('dashboard:delete')}
                        </Button>
                    </ActionsBlock>
                );
            },
        },
    ];
    const colsActive = [
        {
            Header: t('dashboard:date'),
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YY'),
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
            typeProperty: 'date',
            maxWidth: 70,
            minWidth: 70,
        },
        {
            Header: t('dashboard:promo_type'),
            accessor: 'type',
            disableSortBy: true,
            maxWidth: 120,
            disableFilters: true,

            Cell: ({ cell }: any) => t(`dashboard:promo_type_texts.${cell.value}`) as any,
        },
        {
            Header: t('dashboard:left'),
            accessor: 'expired',
            Cell: ({ cell }: any) => `${cell.value} ${t('dashboard:days')}`,
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('dashboard:status_noun'),
            accessor: 'status',
            disableSortBy: true,
            disableFilters: true,
            Cell: ({ cell }: any) => t(`dashboard:promo_status.${cell.value}`) as any,
        },
        {
            Header: t('dashboard:text'),
            accessor: locale === 'ru' ? 'textRu' : 'textUz',
            disableSortBy: true,
            disableFilters: true,
            minWidth: 210,
        },
        {
            Header: t('dashboard:info'),
            disableFilters: true,
            disableSortBy: true,
            maxWidth: 110,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Link href={`/cabinet/promo/edit?id=${cell.id}`}>{t('common:open')}</Link>
                    </ActionsBlock>
                );
            },
        },
    ];

    const promoItems = [
        {
            id: 1,
            title: t('dashboard:promo_texts.all_branches'),
            desc: t('dashboard:promo_texts.all_branches_text'),
            price: `1000 ${t('dashboard:coins')}`,
            url: 'all_branches',
        },
        {
            id: 2,
            title: t('dashboard:promo_texts.all_price_list'),
            desc: t('dashboard:promo_texts.all_price_list_text'),
            price: t('dashboard:coins_from', { coin: 20 }),
            url: 'all_lists',
        },
        {
            id: 3,
            title: t('dashboard:promo_texts.chosen_position'),
            desc: t('dashboard:promo_texts.chosen_position_text'),
            price: t('dashboard:coins_from', { coin: 5 }),
            url: 'chosen',
        },
    ];

    return (
        <div className={s.wrapper}>
            <h4>{t('dashboard:promo_place')}</h4>
            <div className={s.items}>
                {promoItems.map((item) => {
                    return (
                        <div key={item.id} className={s.item}>
                            <p>{item.title}</p>
                            <span>{item.desc}</span>
                            <div className={s.btns}>
                                <Button variant="disabled">{item.price}</Button>
                                <Link href={`/cabinet/promo/${item.url}`}>
                                    <Button variant="primary">{t('dashboard:place')}</Button>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
            <BaseModal
                open={open}
                onClose={handleModalClose}
                headerContent={
                    <div>
                        <h3>{t('dashboard:reject_promo_comment')}</h3>
                    </div>
                }
            >
                <p className={s.comment}>{comment}</p>
            </BaseModal>
            {changeData?.data && (
                <Table
                    handleSort={handleSortProducts}
                    enableSort
                    data={changeData?.data}
                    columns={colsChange}
                    title={<h4>{t('dashboard:need_change')}</h4>}
                />
            )}
            {activeData?.data && (
                <Table
                    handleSort={handleSortProductsApproved}
                    enableSort
                    data={activeData?.data}
                    columns={colsActive}
                    title={<h4>{t('dashboard:active_promo')}</h4>}
                />
            )}
            {activeData?.totalPages > 1 && <Pagination pageCount={activeData.totalPages} />}
        </div>
    );
};
