import { useTranslation } from 'next-i18next';
import s from '../index.module.scss';
import { useEffect, useState } from 'react';
import { priceListApi, productsApi, promoApi, providerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { StatisticsBlock } from 'components/ui/dashboard/statistics_block';
import { FileUpload } from 'components/ui/upload/file';
import { Button } from 'components/ui/button';
import { Form, FormikProvider, useFormik } from 'formik';
import { Icon } from 'components/ui/icon';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ColumnFilter } from 'components/ui/dashboard/table/columnFilter';
import { Table } from 'components/ui/dashboard/table';
import { Pagination } from 'components/ui/pagination/Pagination';
import { ActionsBlock } from 'components/ui/dashboard/table/ActionsBlock';
import { formatNumber } from 'src/helpers/formatNumber';
import { useStore } from 'src/store/useStore';
import { client_validation } from 'src/validation/client_validation';
import { BaseModal } from 'components/ui/dashboard/modal/base_modal';
import { PriceCreateForm } from 'components/pages/dashboard/cabinet/sections/price_list/form/create';
import { useModal } from 'src/hooks/common/useModal';
import { useSortDataAdminProvider } from 'src/hooks/common/useSortDataAdminProvider';

export const PriceListEdit = () => {
    const { t } = useTranslation();
    const { currency } = useStore((state) => state);
    const {
        query: { id, page },
        locale,
        pathname,
        query,
        push,
    } = useRouter();
    const [dataStat, setDataStat] = useState<any>(null);
    const [data, setData] = useState<any>(null);
    const [priceList, setPriceList] = useState(null);
    const { open, handleModalOpen, handleModalClose } = useModal();
    const [searchVal, setSearchVal] = useState('');
    const { sortBy, sortType, handleSortProducts } = useSortDataAdminProvider();

    useEffect(() => {
        (() => {
            promoApi
                .getProductsByPriceList(id as string, locale as string, page as string, searchVal, sortType, sortBy)
                .then((res) => setData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
            priceListApi
                .getPriceListById(id as string)
                .then((res) => setPriceList(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, [page, searchVal, sortType, sortBy]);

    useEffect(() => {
        push(
            {
                pathname: pathname,
                query: { ...query, page: 1 },
            },
            undefined,
            { scroll: false }
        );
    }, [searchVal, sortType, sortBy]);

    useEffect(() => {
        (() => {
            productsApi
                .getListInfo(id as any)
                .then((res) => setDataStat(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, []);

    const formik = useFormik({
        initialValues: {
            pricelistId: id,
            file: '',
        },
        onSubmit(values) {
            const formData = new FormData();
            formData.append('pricelistId', values.pricelistId as string);
            formData.append('file', values.file as string);

            priceListApi
                .updatePriceListProducts(formData)
                .then(() => push('/cabinet/price-list?page=1'))
                .catch(({ response }) => {
                    toast.error(
                        response.data.error
                            ? t(`helpers:${response.data.error.replaceAll(' ', '_')}`)
                            : t(`helpers:error_sending`)
                    );
                });
        },
        validationSchema: client_validation.price_list_edit,
    });

    const statisticsData = [
        {
            id: 1,
            title: t('dashboard:position'),
            date: t('dashboard:refresh_day', { day: dataStat?.updatedAt }),
            count: dataStat?.total,
        },
    ];
    const cols = [
        {
            Header: '',
            accessor: 'description',
            width: 200,
            disableSortBy: true,
            Filter: <ColumnFilter setSearch={setSearchVal} />,
        },
        {
            Header: t('common:selects.number'),
            accessor: 'uniqNumber',
            typeProperty: 'uniq_number',
            disableFilters: true,
            maxWidth: 90,
            disableSortBy: true,
            showSort: true,
        },
        {
            Header: t('common:selects.manufacturers'),
            accessor: 'manufacturer',
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
        },
        {
            Header: t('common:selects.howmany'),
            accessor: 'availability',
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
            Cell: ({ cell }: { cell: any }) => `${cell.value} ${t('common:howmany')}`,
            maxWidth: 90,
        },
        {
            Header: t('common:selects.price'),
            accessor: currency === 'uzs' ? 'sum' : 'usd',
            typeProperty: 'cost',
            disableSortBy: true,
            showSort: true,
            Cell: ({ cell }: { cell: any }) => {
                return currency === 'usd'
                    ? `$${formatNumber(cell.value)}`
                    : `${formatNumber(parseInt(cell.value))} ${t('common:sum')}`;
            },
            disableFilters: true,
        },
        {
            Header: t('dashboard:addv') as string,
            disableFilters: true,
            disableSortBy: true,
            showSort: false,
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

    return (
        <div>
            <StatisticsBlock data={statisticsData as any} title={<h4>{t('dashboard:price_list_info')}</h4>} />

            <FormikProvider value={formik}>
                <Form className={s.btns_wr}>
                    <FileUpload name="file" title={t('dashboard:refresh_price')} setFieldValue={formik.setFieldValue} />
                    <Button
                        fullWidth
                        type="submit"
                        disabled={!formik.dirty || !formik.isValid}
                        variant={!formik.dirty || !formik.isValid ? 'disabled' : 'primary'}
                    >
                        {t('dashboard:refresh')}
                    </Button>
                    <Button fullWidth type="submit" variant={'primary'} onClick={handleModalOpen}>
                        {t('dashboard:edit')}
                    </Button>
                    <Link href={'/cabinet/promo/all_lists'}>
                        <Button variant="primary">
                            <Icon name="label" color="white" />
                            {t('dashboard:add_adv')}
                        </Button>
                    </Link>
                </Form>
            </FormikProvider>
            <BaseModal
                center
                open={open}
                showCloseIcon={false}
                onClose={handleModalClose}
                headerContent={<div className={s.modalHeader}> {t('dashboard:edit_price_list')}</div>}
            >
                <div className={s.modalContent}>
                    <PriceCreateForm data={priceList} handleModalClose={handleModalClose} />
                </div>
            </BaseModal>

            {data?.data && <Table handleSort={handleSortProducts} enableSort data={data.data} columns={cols} />}
            {data?.totalPages > 1 && <Pagination pageCount={data.totalPages} />}
        </div>
    );
};
