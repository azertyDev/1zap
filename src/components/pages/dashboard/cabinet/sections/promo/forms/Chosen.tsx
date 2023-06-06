import { useRouter } from 'next/router';
import { branchApi, promoApi } from 'src/utils/api';
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

interface IOptions {
    label: string;
    value: number | undefined | string;
}

export const ChosenForm = () => {
    const { t } = useTranslation();
    const {
        locale,
        push,
        pathname,
        query,
        query: { page },
    } = useRouter();

    const [branches, setBranches] = useState<IOptions[] | null>(null);
    const [lists, setLists] = useState<IOptions[] | null>(null);
    const [data, setData] = useState<any>(null);
    const [activeIds, setActiveIds] = useState<number[]>([]);

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<any>) => {
        await promoApi
            .addPromoByChosenProducts({
                descriptionRu: formik.values.descriptionRu,
                descriptionUz: formik.values.descriptionUz,
                products: activeIds.map((item) => ({ id: item })),
            })
            .then((res) => {
                push('/cabinet/promo');
            })
            .catch((err) => {
                toast.error(t('helpers:error_sending'));
            });
    };

    const formik = useFormik({
        onSubmit,
        enableReinitialize: true,
        initialValues: {
            branchId: null,
            price: lists && lists.length > 0 ? lists[0].value : null,
            descriptionRu: '',
            descriptionUz: '',
        },
        validationSchema: client_validation.promo,
    });

    useEffect(() => {
        (async () => {
            branchApi
                .getAllBranches()
                .then((res) => {
                    const val = res.map((item: { id: number; branchName: string }) => ({
                        value: item.id,
                        label: item.branchName,
                    }));
                    setBranches(val);
                    formik.setFieldValue('branchId', val[0].value);
                })
                .catch(() => {
                    toast.error(t('helpers:error_getting'));
                });
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (formik.values.branchId) {
                promoApi
                    .getPriceListByBranch(formik.values.branchId as number)
                    .then((res) => {
                        if (res.length === 0) {
                            toast.error(t('dashboard:no_price_list'));
                        }

                        const val1 = res.map((subitem: { id: number; title: string }) => ({
                            value: subitem.id,
                            label: subitem.title,
                        }));
                        setLists(val1);
                    })
                    .catch(() => {
                        toast.error(t('helpers:error_getting'));
                    });
            }
        })();
    }, [formik.values.branchId]);

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

    useEffect(() => {
        (() => {
            if (lists && formik.values.price) {
                promoApi
                    .getProductsByPriceList(formik.values.price as number, locale as string, (page as string) ?? '1')
                    .then((res) => {
                        setData(res);
                    })
                    .catch((err) => {
                        toast.error(t('helpers:error_getting'));
                    });
            }
        })();
        // alert(formik.values.price);
    }, [locale, page, formik.values.price, formik.values.branchId]);

    useEffect(() => {
        push({
            pathname: pathname,
            query: { ...query, page: 1 },
        });
    }, [formik.values.price, formik.values.branchId]);

    const cols = [
        {
            Header: 'Поиск',
            width: 300,
            disableSortBy: true,
            disableFilters: true,
            accessorFn: (row: any) => `${row.description} ${row.id}`,
            Cell: ({ cell }: any) => {
                console.log(cell);
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
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('common:selects.manufacturers'),
            accessor: 'manufacturer',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('common:selects.howmany'),
            accessor: 'availability',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('common:selects.price'),
            accessor: 'sum',
            disableSortBy: true,
            disableFilters: true,
        },
    ];

    console.log(data);
    return (
        <div className={s.root}>
            <Heading title={t('dashboard:promo_place')} desc={t('dashboard:promo_texts.chosen_position')} />
            <PromoForm formik={formik} branchesOptions={branches} lists={lists} />
            {data?.data && <Table data={data.data} columns={cols} />}
            {data?.totalPages > 1 && <Pagination pageCount={data.totalPages} />}
            <PromoSubmitInfo formik={formik} info={{ coin: 500, discount: 2, position: 13 }} />
        </div>
    );
};
