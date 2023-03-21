import dayjs from 'dayjs';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { Column } from 'react-table';
import { Table } from 'src/components/ui/dashboard/table';
import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import { useStore } from 'src/store/useStore';

export const PromoPage: FC = () => {
    const { applications, fetchApplications } = useStore((state) => state);

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    const cols = [
        {
            Header: 'Дата',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YYYY'),
            disableFilters: true,
        },
        {
            Header: 'Поставщик',
            accessor: 'company',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Тип промо',
            accessor: 'type',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Содержание',
            accessor: 'description',
            disableSortBy: true,
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

    const data = [
        {
            id: 1,
            company: 'Hyundai auto asia',
            type: 'На прайс-лист',
            description: 'Обязательно получите подтверждение резерва на 1zap или по звонку',
            createdAt: '2023-03-13T11:34:48.981279Z',
        },
        {
            id: 2,
            company: 'KIA auto service',
            type: 'На филиал',
            description: 'Обязательно получите подтверждение резерва на 1zap или по звонку',
            createdAt: '2023-03-10T11:34:48.981279Z',
        },
    ];

    return (
        <div>
            <Table columns={cols} data={data} title={<h4>Модерация промо материалов</h4>} />
        </div>
    );
};
