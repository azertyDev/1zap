import { OverviewBlock } from 'src/components/ui/dashboard/overview_block';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';
import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';
import { Table } from 'components/ui/dashboard/table';
import { Pagination } from 'components/ui/pagination/Pagination';
import React, { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { FilterCalendar } from 'components/ui/dashboard/table/filterCalendar';
import { IProviderStat } from 'types';
import { providerApi, walletApi } from 'src/utils/api';
import { useRouter } from 'next/router';
import { BaseModal } from 'components/ui/dashboard/modal/base_modal';
import { useModal } from 'src/hooks/common/useModal';
import { Completed } from 'components/ui/completed';
import { Icon } from 'components/ui/icon';

export const Balance = () => {
    const { t } = useTranslation();
    const [data, setData] = useState<any>(null);
    const { open, handleModalOpen, handleModalClose } = useModal();
    const [trigger, setTrigger] = useState(false);

    const [filtringByDate, setFiltringByDate] = useState<null | string>(null);
    const [fullDate, setFullDate] = useState<null | string>(null);
    const [month, setMonth] = useState(new Date());
    const [walletInfo, setWalletInfo] = useState([]);

    const {
        locale,
        query: { page },
    } = useRouter();

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
                .getProviderWalletInfo()
                .then((res) => {
                    setWalletInfo(res);
                })
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, []);

    useEffect(() => {
        (() => {
            walletApi
                .getHistoryProvider(
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
    }, [page, fullDate, month, trigger]);

    const handleSendBalance = useCallback((val: number) => {
        return () => {
            handleModalOpen();
            walletApi
                .addCoins({
                    info: 'wallet_up',
                    coin: val,
                })
                .then(() => setTrigger((prev) => !prev))
                .catch(() => {
                    toast.error(t('helpers:error_sending'));
                });
        };
    }, []);

    const balanceCardsData = [
        {
            id: 100,
            heading: `160.000 ${t('common:sum')}`,
            body: `100 ${t('dashboard:coins')}`,
            footer: t('dashboard:price_for_view', { price: 1600 }),
            icon: 'payments',
        },
        {
            id: 250,
            heading: `350.000 ${t('common:sum')}`,
            body: `250 ${t('dashboard:coins')}`,
            footer: t('dashboard:price_for_view', { price: 1400 }),
            icon: 'payments',
        },
        {
            id: 500,
            heading: `600.000 ${t('common:sum')}`,
            body: `500 ${t('dashboard:coins')}`,
            footer: t('dashboard:price_for_view', { price: 1200 }),
            icon: 'payments',
        },
        {
            id: 1000,
            heading: `1.000.000 ${t('common:sum')}`,
            body: `1000 ${t('dashboard:coins')}`,
            footer: t('dashboard:price_for_view', { price: 1000 }),
            icon: 'payments',
        },
    ];

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
            Cell: ({ cell }: any) => dayjs(cell.value).format('H:MM') as any,
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
                return cell.value == 1 ? t('dashboard:one_coin') : `${cell.value} ${t('dashboard:coins')}`;
            },
            disableFilters: true,
            disableSortBy: false,
            maxWidth: 100,
        },
        {
            Header: t('dashboard:info') as string,
            accessor: 'info',
            Cell: ({ cell }: any) => {
                const val = cell.row.original?.uniqNumber;

                return `${t(`dashboard:wallet_info.${cell.value.toLowerCase()}`)}${val ? ` (${val})` : ''}`;
            },
            disableFilters: true,
            disableSortBy: false,
            minWidth: 220,
        },
    ];

    return (
        <div className={s.wrapper}>
            <div>
                {walletInfo && (
                    <StatisticsBlock
                        data={balanceStatistics as any}
                        title={<h4>{t('dashboard:current_balance')}</h4>}
                    />
                )}
            </div>

            <div className={s.overview}>
                <OverviewBlock
                    isBalance
                    setCoins={handleSendBalance}
                    data={balanceCardsData}
                    title={<h4>{t('dashboard:balanceFilling')}</h4>}
                />
            </div>

            <h4 className={s.title}>{t('dashboard:history_balance')}</h4>
            <FilterCalendar
                setFullDate={setFullDate}
                fullDate={fullDate}
                setMonth={setMonth}
                month={month}
                setFiltringByDate={setFiltringByDate}
            />
            {data?.data && <Table data={data?.data} columns={cols} isSecondType />}
            {data?.totalPages > 1 && <Pagination pageCount={data?.totalPages} />}

            <BaseModal
                center
                open={open}
                showCloseIcon={false}
                onClose={handleModalClose}
                headerContent={<h3> {t('dashboard:balanceFilling')}</h3>}
            >
                <div>
                    <Completed smallTitle title={'thanks'} img={<Icon size={20} name={'done'} />}>
                        <h4>{t('dashboard:balance_moderation')}</h4>
                    </Completed>
                </div>
            </BaseModal>
        </div>
    );
};
