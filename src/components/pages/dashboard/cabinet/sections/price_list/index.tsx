import Link from 'next/link';
import dayjs from 'dayjs';
import { Column } from 'react-table';
import { useEffect, useState } from 'react';
import { MenuItem } from '@szhsin/react-menu';
import { Button } from 'src/components/ui/button';
import { BaseModal } from 'src/components/ui/dashboard/modal/base_modal';
import { StatisticsBlock } from 'src/components/ui/dashboard/statistics_block';
import { Table } from 'src/components/ui/dashboard/table';
import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import { Icon } from 'src/components/ui/icon';
import { Menu } from 'src/components/ui/modal/menu';
import { useModal } from 'src/hooks/common/useModal';
import { useStore } from 'src/store/useStore';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { baseURL } from 'src/utils/constants';
import { PriceCreateForm } from './form/create';
import { priceListApi, providerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';

import s from './index.module.scss';
import { IProviderStat } from 'types';
import { Pagination } from 'components/ui/pagination/Pagination';

export const PriceList = () => {
    const { t } = useTranslation();
    const { push } = useRouter();
    const { fetchProviderBranches } = useStore();
    const [priceList, setPriceList] = useState<any>(null);
    const { open, handleModalOpen, handleModalClose } = useModal();
    const {
        query: { page },
    } = useRouter();

    const [dataStat, setDataStat] = useState<IProviderStat | null>(null);

    useEffect(() => {
        (() => {
            providerApi
                .getProviderStatistic()
                .then((res) => setDataStat(res))
                .catch(() => toast.error('helpers:error_getting'));
        })();
    }, []);

    useEffect(() => {
        priceListApi
            .fetchPriceList(page as string)
            .then((res) => setPriceList(res))
            .catch(() => toast.error(t('helpers:error_getting')));
    }, [page]);

    useEffect(() => {
        fetchProviderBranches();
    }, [fetchProviderBranches]);

    const openModal = () => {
        handleModalOpen();
    };

    const deleteCell = (id: number) => {
        priceListApi.delete(id).then(() => {
            priceListApi
                .fetchPriceList(page as string)
                .then((res) => setPriceList(res))
                .catch(() => toast.error(t('helpers:error_getting')));
            toast.success(t('helpers:deleted'));
        });
    };

    const menuContent = (data: any) => (
        <MenuItem onClick={() => deleteCell(data.id)}>
            <Icon name="delete" color="black" />
            {t('dashboard:delete')}
        </MenuItem>
    );

    const priceListCols: Column<any>[] = [
        {
            Header: t('dashboard:price_list_name') as string,
            accessor: 'title',
            disableSortBy: true,
            disableFilters: true,
            width: 200,
        },
        {
            Header: t('dashboard:price_list_type') as string,
            accessor: 'type',
            // @ts-ignore
            Cell: ({ cell }) => {
                switch (cell.value) {
                    case 'part':
                        return t('common:partSelection');
                    case 'tire':
                        return t('common:tires');
                    case 'oil':
                        return t('common:oil');
                    case 'battery':
                        return t('common:batteries');
                }
            },
            disableSortBy: true,
            disableFilters: true,
            width: 120,
        },
        {
            Header: t('dashboard:branch') as string,
            accessor: 'branchName',
            disableFilters: true,
            disableSortBy: true,
        },
        {
            Header: 'ID',
            accessor: 'id',
            disableSortBy: true,
            disableFilters: true,
            width: 50,
        },
        {
            Header: t('dashboard:date') as string,
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YY') as any,
            disableFilters: true,
        },
        {
            Header: t('dashboard:action') as string,
            disableFilters: true,
            disableSortBy: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock cell={cell} menu={menuContent(cell)}>
                        <Link href={`/cabinet/price-list/edit?page=1&id=${cell.id}`}>{t('common:open')}</Link>
                    </ActionsBlock>
                );
            },
        },
    ];

    const statisticsData = [
        {
            id: 1,
            title: t('dashboard:position'),
            date: t('dashboard:refresh_day', { day: dataStat?.products?.date }),
            count: dataStat?.products?.total,
        },
        {
            id: 2,
            title: t('dashboard:transitions'),
            date: t('dashboard:this_month'),
            count: dataStat?.transitions?.total,
        },
    ];

    const filesMenu = [
        { id: 1, name: t('common:partSelection'), file: `${baseURL}/static/parts.xlsx` },
        { id: 2, name: t('common:oil'), file: `${baseURL}/static/oils.xlsx` },
        { id: 3, name: t('common:batteries'), file: `${baseURL}/static/battery.xlsx` },
        { id: 4, name: t('common:tires'), file: `${baseURL}/static/tires.xlsx` },
    ];

    return (
        <div className={s.wrapper}>
            <StatisticsBlock data={statisticsData as any} title={<h4>{t('dashboard:current_res')}</h4>} />

            <div className={s.actionBtns}>
                <Menu
                    button={
                        <Button variant="primary">
                            <Icon name="cloud_download" color="white" />
                            {t('dashboard:download_ex')}
                        </Button>
                    }
                >
                    <>
                        {filesMenu.map((menu) => {
                            return (
                                <MenuItem key={menu.id} href={menu.file}>
                                    <Icon name="cloud_download" color="black" />
                                    {menu.name}
                                </MenuItem>
                            );
                        })}
                    </>
                </Menu>
                <Button variant="primary" onClick={openModal}>
                    <Icon name="table_chart" color="white" />
                    {t('dashboard:new_price')}
                </Button>
                <Button variant="primary" onClick={() => push('/cabinet/promo/all_lists')}>
                    <Icon name="label" color="white" />
                    {t('dashboard:add_adv')}
                </Button>
            </div>

            {priceList?.data?.length > 0 && <Table columns={priceListCols} data={priceList?.data} />}
            {priceList?.totalPages > 1 && <Pagination pageCount={priceList?.totalPages} />}

            <BaseModal
                center
                open={open}
                showCloseIcon={false}
                onClose={handleModalClose}
                headerContent={<div className={s.modalHeader}> {t('dashboard:new_price')}</div>}
            >
                <div className={s.modalContent}>
                    <PriceCreateForm handleModalClose={handleModalClose} />
                </div>
            </BaseModal>
        </div>
    );
};
