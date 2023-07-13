import { useRouter } from 'next/router';
import { promoApi } from 'src/utils/api';
import { useCallback, useEffect, useState } from 'react';
import { Heading } from 'src/components/ui/dashboard/heading';
import { FormikHelpers, FormikValues, useFormik } from 'formik';
import s from './index.module.scss';
import { PromoForm } from 'components/ui/dashboard/promo_form';
import { client_validation } from 'src/validation/client_validation';
import { PromoSubmitInfo } from 'components/ui/dashboard/promo_submit_info';
import { useTranslation } from 'next-i18next';
import { Table } from 'components/ui/dashboard/table';
import { Pagination } from 'components/ui/pagination/Pagination';
import { Icon } from 'components/ui/icon';
import { toast } from 'react-hot-toast';
import { mathPromo } from 'src/helpers/mathPromo';
import { useGetBranchesAndPriceLists } from 'src/hooks/promo/useGetBranchesAndPriceLists';
import { useGetPriceListInfo } from 'src/hooks/promo/useGetPriceListInfo';
import { useGetBranchInfo } from 'src/hooks/promo/useGetBranchInfo';
import { ColumnFilter } from 'components/ui/dashboard/table/columnFilter';
import { formatNumber } from 'src/helpers/formatNumber';
import { useStore } from 'src/store/useStore';

export const ChosenForm = () => {
    const { t } = useTranslation();
    const {
        locale,
        push,
        pathname,
        query,
        query: { page },
    } = useRouter();
    const { currency } = useStore((state) => state);

    const { formikBranches, formikPrice, branches, lists } = useGetBranchesAndPriceLists();
    const { branchInfo } = useGetBranchInfo(formikBranches, formikBranches.values.branchId);
    const [data, setData] = useState<any>(null);
    const [activeIds, setActiveIds] = useState<number[]>([]);

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<any>) => {
        await promoApi
            .addPromoByChosenProducts({ ...values, products: activeIds.map((item) => ({ id: item })) })
            .then((res) => {
                push('/cabinet/promo?page=1');
            })
            .catch((err) => {
                if (err.response.data.error === 'insufficient funds') {
                    toast.error(t('dashboard:no_coins'));
                } else toast.error(t('helpers:error_sending'));
            });
    };

    const handleActiveIds = useCallback((id: number) => {
        return () => {
            setActiveIds((prev) => {
                if (prev.includes(id)) {
                    return prev.filter((item) => item !== id);
                }
                return [...prev, id];
            });
        };
    }, []);

    const { listInfo } = useGetPriceListInfo(formikPrice, formikPrice.values.pricelistId);

    const formikTexts = useFormik({
        onSubmit,
        enableReinitialize: true,
        initialValues: {
            descriptionRu: listInfo.textRu ? listInfo.textRu : branchInfo.textRu ? branchInfo.textRu : '',
            descriptionUz: listInfo.textUz ? listInfo.textUz : branchInfo.textUz ? branchInfo.textUz : '',
        },
        validationSchema: client_validation.promo,
    });

    useEffect(() => {
        (() => {
            if (lists && formikPrice.values.pricelistId) {
                promoApi
                    .getProductsByPriceList(
                        formikPrice.values.pricelistId as number,
                        locale as string,
                        (page as string) ?? '1'
                    )
                    .then((res) => {
                        setData(res);
                    })
                    .catch((err) => {
                        toast.error(t('helpers:error_getting'));
                    });
            }
        })();
    }, [locale, page, formikPrice.values.pricelistId, formikBranches.values.branchId]);

    useEffect(() => {
        push({
            pathname: pathname,
            query: { ...query, page: 1 },
        });
    }, [formikPrice.values.pricelistId, formikPrice.values.pricelistId]);

    const cols = [
        {
            Header: '',
            accessor: 'description',
            width: 300,
            disableSortBy: true,
            Filter: <ColumnFilter setData={setData} idOut={formikPrice.values.pricelistId as number} />,
            Cell: ({ cell }: any) => {
                return (
                    <div
                        onClick={handleActiveIds(cell.row.original.id)}
                        className={`${s.checkbox} ${cell.row.original.hasAdvertising ? s.active : ''}`}
                    >
                        <div
                            className={`${s.checkbox_indicator} ${
                                activeIds.includes(cell.row.original.id) || cell.row.original.hasAdvertising
                                    ? s.active
                                    : ''
                            }`}
                        >
                            <Icon size={13} name={'done'} style={s.icon} />
                        </div>
                        {cell.row.original.description}
                    </div>
                );
            },
        },
        {
            Header: t('common:selects.number'),
            accessor: 'uniqNumber',
            disableFilters: true,
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
        },
        {
            Header: t('common:selects.price'),
            accessor: 'sum',
            disableFilters: true,
            Cell: ({ cell }: { cell: any }) => {
                return currency === 'usd'
                    ? `$${formatNumber(cell.value)}`
                    : `${formatNumber(parseInt(`${cell.value}`))} ${t('common:sum')}`;
            },
        },
    ];

    return (
        <div className={s.root}>
            <Heading title={t('dashboard:promo_place')} desc={t('dashboard:promo_texts.chosen_position')} />
            <PromoForm
                formik={formikBranches}
                formikPrice={formikPrice}
                formikTexts={formikTexts}
                branchesOptions={branches}
                disableTextarea={listInfo.hasReclam || branchInfo.hasReclam}
                lists={lists}
            />
            {!branchInfo.hasReclam && !listInfo.hasReclam && (
                <>
                    {data?.data && <Table data={data.data} columns={cols} />}
                    {data?.totalPages > 1 && <Pagination pageCount={data.totalPages} />}
                </>
            )}
            {!branchInfo.hasReclam && !listInfo.hasReclam && (
                <PromoSubmitInfo
                    formik={formikTexts}
                    info={{ ...mathPromo(activeIds.length * 5), position: activeIds.length }}
                />
            )}

            {(listInfo.hasReclam || branchInfo.hasReclam) && (
                <div className={s.has_promo}>
                    <h5>{t('dashboard:has_promo')}</h5>
                </div>
            )}
        </div>
    );
};
