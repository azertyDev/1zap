import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { walletApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';
import s from 'components/pages/dashboard/cabinet/sections/balance/index.module.scss';
import { StatisticsBlock } from 'components/ui/dashboard/statistics_block';
import { FilterCalendar } from 'components/ui/dashboard/table/filterCalendar';
import { Table } from 'components/ui/dashboard/table';
import { Pagination } from 'components/ui/pagination/Pagination';
import { Heading } from 'components/ui/dashboard/heading';
import { Button } from 'src/components/ui/button';
import { Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import { FloatingInput } from 'src/components/ui/input/float_input';
import { client_validation } from 'src/validation/client_validation';

export const ViewProviderBalance = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<any>(null);
    const [activeCoin, setActiveCoin] = useState(0);
    const coins = [50, 100, 250, 500, 1000];

    const [filtringByDate, setFiltringByDate] = useState<null | string>(null);
    const [fullDate, setFullDate] = useState<null | string>(null);
    const [month, setMonth] = useState(new Date());

    const [walletInfo, setWalletInfo] = useState([]);

    const {
        query: { page, id },
        back,
        push,
    } = useRouter();

    const handleActiveCoin = (coin: number) => {
        return () => setActiveCoin(coin);
    };

    const balanceStatistics = walletInfo.map((item: { id: number; expiredAt: string; coin: number }) => {
        return {
            id: item.id,
            title: t('dashboard:coinsBig'),
            date: t('dashboard:till', { till: item.expiredAt }),
            count: item.coin,
        };
    });

    useEffect(() => {
        (() => {
            walletApi
                .getProviderWalletInfoByAdmin(id as string)
                .then((res) => {
                    setWalletInfo(res);
                })
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, []);

    useEffect(() => {
        (() => {
            walletApi
                .getHistoryProviderByAdmin(
                    id as string,
                    page as string,
                    filtringByDate
                        ? filtringByDate === 'month'
                            ? dayjs(month).format('YYYY-MM')
                            : dayjs(fullDate).format('YYYY-MM-DD')
                        : null
                )
                .then((res) => setData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, [page, month, fullDate]);

    const cols = [
        {
            Header: t('dashboard:date') as string,
            id: 'eventdate',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YY') as any,
            disableSortBy: false,
            disableFilters: true,
            maxWidth: 70,
        },
        {
            Header: t('dashboard:time') as string,
            id: 'eventtime',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs.tz(cell.value, 'Asia/Tashkent').format('H:mm') as any,
            disableFilters: true,
            disableSortBy: false,
            maxWidth: 70,
        },
        {
            Header: t('dashboard:type') as string,
            accessor: 'action',
            Cell: ({ cell }: any) => t(`dashboard:wallet_type.${cell.value}`),
            disableFilters: true,
            disableSortBy: false,
            minWidth: 200,
        },
        {
            Header: t('dashboard:cost') as string,
            accessor: 'amount',
            Cell: ({ cell }: any) => {
                return `${cell.value} ${t('dashboard:coins')}`;
            },
            disableFilters: true,
            disableSortBy: false,
            maxWidth: 100,
        },
        {
            Header: t('dashboard:info') as string,
            accessor: 'info',
            Cell: ({ cell }: any) => t(`dashboard:wallet_info.${cell.value.toLowerCase()}`),
            disableFilters: true,
            disableSortBy: false,
            minWidth: 220,
        },
    ];

    const formik = useFormik({
        initialValues: { coinText: activeCoin },
        enableReinitialize: true,
        validationSchema: client_validation.coins,
        onSubmit: (values) => {
            walletApi
                .addCoinsByAdmin({
                    providerId: +id!,
                    coin: +values.coinText,
                })
                .then(() => push(`/dashboard/providers/profile?id=${id}`))
                .catch(() => toast.error(t('helpers:error_sending')));
        },
    });

    return (
        <div className={s.wrapper}>
            <Heading title={t(`dashboard:balance`)} desc={''} />
            <div>
                {walletInfo && (
                    <StatisticsBlock
                        data={balanceStatistics as any}
                        title={<h4>{t('dashboard:current_balance')}</h4>}
                    />
                )}
            </div>

            <h4 className={s.title}>{t('dashboard:balanceFilling')}</h4>
            <div className={s.coins_wrapper}>
                {coins.map((coin) => {
                    return (
                        <Button
                            onClick={handleActiveCoin(coin)}
                            key={coin}
                            variant={activeCoin === coin ? 'primary' : 'disabled'}
                        >
                            {coin} {t('dashboard:coinsBig')}
                        </Button>
                    );
                })}
            </div>
            <FormikProvider value={formik}>
                <Form>
                    <div className={s.form}>
                        <FloatingInput {...formik.getFieldProps('coinText')} />
                    </div>

                    <h4 className={s.title}>{t('dashboard:history_balance')}</h4>
                    {data && (
                        <FilterCalendar
                            setFullDate={setFullDate}
                            fullDate={fullDate}
                            setMonth={setMonth}
                            month={month}
                            setFiltringByDate={setFiltringByDate}
                        />
                    )}

                    {data?.data && <Table data={data?.data} columns={cols} isSecondType />}
                    {data?.totalPages > 1 && <Pagination pageCount={data?.totalPages} />}

                    <div className={s.submit_btn_wr}>
                        <Button variant="disabled" type="reset" onClick={back}>
                            {t('common:cancel')}
                        </Button>
                        <Button
                    
                            type="submit"
                            disabledPointer={formik.isSubmitting}
                            disabled={ activeCoin === 0}
                            variant={ activeCoin === 0 ? 'disabled' : 'primary'}
                        >
                            {t('dashboard:refresh')}
                        </Button>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};
