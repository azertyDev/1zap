import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Column } from 'react-table';
import { Button } from 'src/components/ui/button';
import { BaseModal } from 'src/components/ui/dashboard/modal/base_modal';
import { Table } from 'src/components/ui/dashboard/table';
import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import { useModal } from 'src/hooks/common/useModal';
import { vinOrderApi } from 'src/utils/api';
import s from './index.module.scss';

export const IncominRequests = () => {
    const [data, setData] = useState<any>();
    const { open, handleModalClose, handleModalOpen } = useModal(false);

    console.log(data?.data);

    useEffect(() => {
        vinOrderApi
            .fetchVinRequests()
            .then((response) => {
                setData(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const vinRequestCols: Column<any>[] = [
        {
            Header: 'Дата',
            // accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(Date.now()).format('DD/MM/YYYY') as any,
            // Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YYYY') as any,
            disableFilters: true,
        },
        {
            Header: 'Марка',
            accessor: 'brand',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Модель',
            accessor: 'model',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Год',
            accessor: 'yearIssue',
            disableSortBy: true,
            disableFilters: true,
            width: 90,
            maxWidth: 100,
            minWidth: 80,
        },
        {
            Header: 'Статус',
            accessor: 'createdAt',
            // Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YYYY') as any,
            disableFilters: true,
        },
        {
            Header: 'Город',
            accessor: 'city',
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
                        <Button variant="primary" fullWidth onClick={handleModalOpen}>
                            Открыть
                        </Button>
                    </ActionsBlock>
                );
            },
        },
    ];

    return (
        <div className={s.root}>
            {data?.data.length > 0 && (
                <Table data={data?.data} columns={vinRequestCols} title={<h4>Запросы на модерацию</h4>} />
            )}

            <BaseModal
                center
                open={open}
                showCloseIcon={false}
                onClose={handleModalClose}
                headerContent={
                    <div>
                        <h2>Детали VIN запроса</h2>
                        <span>01/10/2022 в 10:00</span>
                    </div>
                }
            >
                <div className={s.modalContent}>
                    <p>Информация об автомобиле</p>
                </div>
            </BaseModal>
        </div>
    );
};
