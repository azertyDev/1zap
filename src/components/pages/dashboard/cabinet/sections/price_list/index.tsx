import Link from 'next/link';
import dayjs from 'dayjs';
import { Column } from 'react-table';
import { useEffect, useMemo, useState } from 'react';
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
import s from './index.module.scss';
import { IBranchData } from 'types';

export const PriceList = () => {
    const { t } = useTranslation();
    const { push } = useRouter();
    const { priceList, fetchPriceList, fetchProviderBranches } = useStore();
    const { open, handleModalOpen, handleModalClose } = useModal();

    useEffect(() => {
        fetchPriceList();
        fetchProviderBranches();
    }, []);

    const openModal = () => {
        handleModalOpen();
    };

    const priceListCols: Column<any>[] = [
        {
            Header: 'Название прайса',
            accessor: 'title',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Тип прайса',
            accessor: 'type',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Филиал',
            accessor: 'branchName',
            disableFilters: true,
            disableSortBy: true,
        },
        {
            Header: 'ID',
            accessor: 'id',
            disableSortBy: true,
            disableFilters: true,
            width: 90,
            maxWidth: 100,
            minWidth: 80,
        },
        {
            Header: 'Дата',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YYYY') as any,
            disableFilters: true,
        },
        {
            Header: 'Действия',
            disableFilters: true,
            disableSortBy: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock cell={cell}>
                        <Link
                            href={{
                                pathname: '#',
                            }}
                        >
                            Открыть
                        </Link>
                    </ActionsBlock>
                );
            },
        },
    ];

    const statisticsData = [
        {
            id: 1,
            title: 'Позиций',
            date: 'Обновление 20.10.22',
            count: '10.12',
        },
        {
            id: 2,
            title: 'Переходов',
            date: 'За текущий месяц',
            count: '120',
        },
    ];

    const filesMenu = [
        { id: 1, name: 'Запчасти', file: `${baseURL}/static/parts.xlsx` },
        { id: 2, name: 'Масла', file: `${baseURL}/static/oils.xlsx` },
        { id: 3, name: 'Аккумуляторы', file: `${baseURL}/static/battery.xlsx` },
        { id: 4, name: 'Шины', file: `${baseURL}/static/tires.xlsx` },
    ];

    return (
        <div className={s.wrapper}>
            <StatisticsBlock data={statisticsData} title={<h4>Текущие показатели</h4>} />

            <div className={s.actionBtns}>
                <Menu
                    button={
                        <Button variant="primary">
                            <Icon name="cloud_download" color="white" />
                            Скачать шаблон
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
                    Новый прайс лист
                </Button>
                <Button variant="primary" onClick={() => push('/cabinet/promo')}>
                    <Icon name="label" color="white" />
                    Разместить рекламу
                </Button>
            </div>

            {priceList?.data?.length > 0 && <Table columns={priceListCols} data={priceList?.data} />}

            <BaseModal
                center
                open={open}
                showCloseIcon={false}
                onClose={handleModalClose}
                headerContent={<div className={s.modalHeader}>Новый прайс лист</div>}
            >
                <div className={s.modalContent}>
                    <PriceCreateForm handleModalClose={handleModalClose} />
                </div>
            </BaseModal>
        </div>
    );
};
