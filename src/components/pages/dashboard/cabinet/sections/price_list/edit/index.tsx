import { useTranslation } from 'next-i18next';
import s from './index.module.scss';
import { useEffect, useState } from 'react';
import { IProviderStat } from 'types';
import { promoApi, providerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { StatisticsBlock } from 'components/ui/dashboard/statistics_block';
import { FileUpload } from 'components/ui/upload/file';
import { Button } from 'components/ui/button';
import { useFormik } from 'formik';
import { Icon } from 'components/ui/icon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { client_validation } from 'src/validation/client_validation';
import { ColumnFilter } from 'components/ui/dashboard/table/columnFilter';
import { Table } from 'components/ui/dashboard/table';
import { Pagination } from 'components/ui/pagination/Pagination';
import { ActionsBlock } from 'components/ui/dashboard/table/ActionsBlock';
import { formatNumber } from 'src/helpers/formatNumber';
import { useStore } from 'src/store/useStore';

export const PriceListEdit = () => {
    const { t } = useTranslation();
    const { currency } = useStore((state) => state);
    const {
        query: { id, page },
        locale,
    } = useRouter();
    const [dataStat, setDataStat] = useState<IProviderStat | null>(null);
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        (() => {
            promoApi
                .getProductsByPriceList(id as string, locale as string, page as string)
                .then((res) => setData(res))
                .catch(() => toast.error('helpers:error_getting'));
        })();
    }, [page]);

    useEffect(() => {
        (() => {
            providerApi
                .getProviderStatistic()
                .then((res) => setDataStat(res))
                .catch(() => toast.error('helpers:error_getting'));
        })();
    }, []);

    const formik = useFormik({
        initialValues: {
            title: '',
        },
        onSubmit() {},
        validationSchema: client_validation.price_list_edit,
    });

    const statisticsData = [
        {
            id: 1,
            title: t('dashboard:position'),
            date: t('dashboard:refresh_day', { day: dataStat?.products?.date }),
            count: dataStat?.products?.total,
        },
    ];
    const cols = [
        {
            Header: '',
            accessor: 'description',
            width: 200,
            disableSortBy: true,
            Filter: ColumnFilter,
        },
        {
            Header: t('common:selects.number'),
            accessor: 'uniqNumber',
            disableFilters: true,
            maxWidth: 90,
        },
        {
            Header: t('common:selects.manufacturers'),
            accessor: 'manufacturer',
            disableFilters: true,
        },
        {
            Header: t('common:selects.howmany'),
            accessor: 'availability',
            disableFilters: true,
            Cell: ({ cell }: { cell: any }) => `${cell.value} ${t('common:howmany')}`,
            maxWidth: 90,
        },
        {
            Header: t('common:selects.price'),
            accessor: currency === 'uzs' ? 'sum' : 'usd',
            Cell: ({ cell }: { cell: any }) => {
                return currency === 'usd' ? `$${cell.value}` : `${formatNumber(cell.value)} ${t('common:sum')}`;
            },
            disableFilters: true,
        },

        {
            Header: t('dashboard:action') as string,
            disableFilters: true,
            disableSortBy: true,
            width: 100,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <div className={`${s.table_btn} ${cell.hasAdvertising ? s.active : ''}`}>
                            <Button variant={'primary'} type={'button'}>
                                {cell.hasAdvertising ? t('dashboard:have') : t('dashboard:dont_have')}
                            </Button>
                        </div>
                    </ActionsBlock>
                );
            },
        },
    ];

    console.log(data);

    return (
        <div>
            <StatisticsBlock data={statisticsData as any} title={<h4>{t('dashboard:current_res')}</h4>} />

            <div className={s.btns_wr}>
                <FileUpload name="file" title={t('dashboard:download_price')} setFieldValue={formik.setFieldValue} />

                <Link href={"'/cabinet/promo/all_lists"}>
                    <Button variant="primary">
                        <Icon name="label" color="white" />
                        {t('dashboard:add_adv')}
                    </Button>
                </Link>
                <Button
                    fullWidth
                    type="submit"
                    disabled={!formik.dirty || !formik.isValid}
                    variant={!formik.dirty || !formik.isValid ? 'disabled' : 'primary'}
                >
                    {t('dashboard:refresh')}
                </Button>
            </div>

            {data?.data && <Table data={data.data} columns={cols} />}
            {data?.totalPages > 1 && <Pagination pageCount={data.totalPages} />}
        </div>
    );
};
