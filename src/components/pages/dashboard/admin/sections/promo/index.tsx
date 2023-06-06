import dayjs from 'dayjs';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { promoApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { Table } from 'components/ui/dashboard/table';
import { Pagination } from 'components/ui/pagination/Pagination';

export const PromoPage: FC = () => {
    const [dataActive, setDataActive] = useState<any>(null);
    const [dataModeration, setDataModeration] = useState<any>(null);

    const { t } = useTranslation();
    const {
        locale,
        query: { page, activePromoPage },
    } = useRouter();

    useEffect(() => {
        (() => {
            promoApi
                .getModerationPromoByAdmin((page ?? '1') as string)
                .then((res) => setDataModeration(res))
                .catch((err) => toast.error(t('helpers:error_getting')));
        })();
    }, [page]);

    useEffect(() => {
        (() => {
            promoApi
                .getActivePromoByAdmin((activePromoPage ?? '1') as string)
                .then((res) => setDataActive(res))
                .catch((err) => toast.error(t('helpers:error_getting')));
        })();
    }, [activePromoPage]);

    // console.log('moderation', dataModeration);
    // console.log('active', dataActive);

    const colsModer = [
        {
            Header: t('dashboard:date'),
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YYYY'),
            disableFilters: true,
            maxWidth: 40,
        },
        {
            Header: t('dashboard:provider'),
            accessor: 'provider',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('dashboard:promo_type'),
            accessor: 'type',
            disableSortBy: true,
            disableFilters: true,
            Cell: ({ cell }: any) => t(`dashboard:promo_type_texts.${cell.value}`) as any,
        },
        {
            Header: t('dashboard:text'),
            accessor: locale === 'ru' ? 'textRu' : 'textUz',
            disableSortBy: true,
            disableFilters: true,
            minWidth: 210,
        },
        {
            Header: t('dashboard:action'),
            disableFilters: true,
            disableSortBy: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Link href={`/dashboard/promo/edit?id=${cell.id}&type=moderation`}>{t('common:open')}</Link>
                    </ActionsBlock>
                );
            },
        },
    ];
    const colsActive = [
        {
            Header: t('dashboard:date'),
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YYYY'),
            disableFilters: true,
        },
        {
            Header: t('dashboard:provider'),
            accessor: 'provider',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('dashboard:promo_type'),
            accessor: 'type',
            disableSortBy: true,
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
            Cell: ({ cell }: any) => t(`dashboard:promo_status.${cell.value}`),
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('dashboard:action'),
            disableFilters: true,
            disableSortBy: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Link href={`/dashboard/promo/edit?id=${cell.id}&type=active`}>{t('common:open')}</Link>
                    </ActionsBlock>
                );
            },
        },
    ];

    return (
        <div>
            {dataModeration?.data && (
                <Table columns={colsModer} data={dataModeration.data} title={<h4>{t('dashboard:moder_promo')}</h4>} />
            )}
            {dataModeration?.totalPages > 1 && <Pagination pageCount={dataModeration?.totalPages} />}

            <div style={{ margin: '0 0 40px' }}></div>
            {dataActive?.data && (
                <Table
                    columns={colsActive}
                    data={dataActive.data}
                    title={<h4>{t('dashboard:active_admin_promo')}</h4>}
                />
            )}
            {dataActive?.totalPages > 1 && (
                <Pagination pageCount={dataActive?.totalPages} pageName={'activePromoPage'} />
            )}
        </div>
    );
};
