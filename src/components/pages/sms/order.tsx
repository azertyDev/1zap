import s from './index.module.scss';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { smsApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { Table } from 'components/ui/dashboard/table';

export const SmsOrder = () => {
    const {
        query: { id },
    } = useRouter();

    const { t } = useTranslation();
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        smsApi
            .order(id as string)
            .then((res) => setData(res))
            .catch(() => toast.error(t('helpers:error_getting')));
    }, []);

    const cols = [
        {
            Header: 'Id',
            accessor: 'uniqId',
            disableSortBy: true,
            disableFilters: true,
            maxWidth: 250,
        },
        {
            Header: t('dashboard:type'),
            accessor: 'type',
            disableSortBy: true,
            disableFilters: true,
            maxWidth: 100,
        },
        {
            Header: t('common:selects.price'),
            accessor: 'cost',

            disableSortBy: true,
            disableFilters: true,
            maxWidth: 100,
        },
        {
            Header: t('dashboard:number'),
            accessor: 'uniqNumber',
            disableSortBy: true,
            disableFilters: true,
            maxWidth: 100,
        },
        {
            Header: t('dashboard:info'),
            accessor: 'description',
            disableSortBy: true,
            disableFilters: true,
            maxWidth: 100,
        },
    ];

    return <div className={s.wr}>{data && <Table data={[data]} columns={cols} />}</div>;
};
