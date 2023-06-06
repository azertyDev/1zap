import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { Column } from 'react-table';
import { Button } from 'components/ui/button';
import { BaseModal } from 'components/ui/dashboard/modal/base_modal';
import { Table } from 'components/ui/dashboard/table';
import { ActionsBlock } from 'components/ui/dashboard/table/ActionsBlock';
import { useModal } from 'src/hooks/common/useModal';
import { vinOrderApi } from 'src/utils/api';
import s from './index.module.scss';
import Link from 'next/link';
import { Icon } from 'components/ui/icon';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import { IVinItem } from 'types';
import { useRouter } from 'next/router';
import { Pagination } from 'components/ui/pagination/Pagination';

export const IncominRequests = () => {
    const [data, setData] = useState<any>();
    const [vinData, setVinData] = useState<IVinItem | null>(null);
    const {
        query: { page },
    } = useRouter();

    const handleVinData = useCallback((data: IVinItem) => {
        return () => {
            setVinData(data);
            handleModalOpen();
        };
    }, []);

    const { t } = useTranslation();
    const { open, handleModalClose, handleModalOpen } = useModal(false);
    const { push } = useRouter();

    useEffect(() => {
        vinOrderApi
            .getAllVinByProviderCommon((page ?? '1') as string)
            .then((response) => {
                setData(response);
            })
            .catch((err) => {
                toast.error(t('helpers:error_getting'));
            });
    }, [page]);

    const handleShowContacts = useCallback((id: number) => {
        return async () => {
            vinOrderApi
                .acceptVinByProvider(id)
                .then((response) => {
                    push('/cabinet/incoming_requests?status=accepted&page=1');
                    toast.success(t('helpers:vin_accept'));
                })
                .catch((err) => {
                    toast.error(t('helpers:error_sending'));
                });
        };
    }, []);

    const vinRequestCols: Column<any>[] = [
        {
            Header: t('dashboard:date') as string,
            id: 'eventdate',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YYYY') as any,
            disableFilters: true,
            disableSortBy: false,
            width: 80,
        },
        {
            Header: t('dashboard:time') as string,
            id: 'eventtime',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('h:mm') as any,
            disableFilters: true,
            disableSortBy: false,
            width: 60,
        },
        {
            Header: t('common:selects.brand') as string,
            accessor: 'brand',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('common:selects.model') as string,
            accessor: 'model',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: t('common:selects.year') as string,
            accessor: 'yearIssue',
            disableSortBy: true,
            disableFilters: true,
            width: 60,
        },
        {
            Header: t('dashboard:status_noun') as string,
            accessor: 'status',
            Cell: ({ cell }: any) => t(`dashboard:status.${cell.value}`) as any,
            disableSortBy: true,
            disableFilters: true,
            width: 95,
        },
        {
            Header: t('common:selects.city') as string,
            accessor: 'city',
            Cell: ({ cell }: any) => t(`common:selects.${cell.value}`) as any,
            disableSortBy: true,
            disableFilters: true,
            width: 95,
        },
        {
            Header: t('dashboard:req_detail') as string,
            disableFilters: true,
            disableSortBy: true,
            width: 110,
            accessor: (cell: any) => {
                console.log(cell);
                return (
                    <ActionsBlock>
                        <Button variant="primary" fullWidth onClick={handleVinData(cell)}>
                            {t('common:open')}
                        </Button>
                    </ActionsBlock>
                );
            },
        },
    ];

    return (
        <div className={s.root}>
            <h2> {t('dashboard:new_req')}</h2>
            <div className={s.link}>
                <Link href={'/cabinet/incoming_requests?status=accepted&page=1'}>
                    <Button variant={'primary'}>
                        <Icon name={'archive'} size={20} color={'#fff'} />
                        {t('dashboard:accepted_req')}
                    </Button>
                </Link>
            </div>

            {data?.data.length > 0 && <Table data={data?.data} columns={vinRequestCols} />}
            {data?.totalPages > 1 && <Pagination pageCount={data.totalPages} />}
            <BaseModal
                center
                open={open}
                showCloseIcon={false}
                onClose={handleModalClose}
                headerContent={
                    <div>
                        <h2>{t('dashboard:req_detail_vin')}</h2>
                        {vinData && (
                            <span>
                                {dayjs(vinData.createdAt).format('DD/MM/YYYY')}{' '}
                                {t('common:in', { time: dayjs(vinData.createdAt).format('h:mm') })}
                            </span>
                        )}
                    </div>
                }
            >
                {vinData && (
                    <div>
                        <h6 className={s.modal_tabs_title}> {t('dashboard:car_info')}</h6>
                        <div className={s.modal_table_wr}>
                            <div>
                                <p> {t('common:selects.brand')}</p>
                                <p>{vinData.brand}</p>
                            </div>
                            <div>
                                <p> {t('common:selects.model')}</p>
                                <p>{vinData.model}</p>
                            </div>
                            <div>
                                <p> {t('common:selects.year')}</p>
                                <p>{vinData.yearIssue}</p>
                            </div>
                            <div>
                                <p> VIN</p>
                                <p>{vinData.vinNumber}</p>
                            </div>
                        </div>
                        <div className={s.modal_description}>
                            <h6 className={s.modal_tabs_title}> {t('dashboard:info_detail')}</h6>
                            <p>{vinData.description}</p>
                        </div>

                        <div className={s.control_btns}>
                            <Button variant={'primary'} onClick={handleShowContacts(vinData.id)}>
                                {t('dashboard:client_contact')}
                            </Button>

                            <Button variant={'disabled'} onClick={handleModalClose}>
                                {t('common:close')}
                            </Button>
                        </div>
                    </div>
                )}
            </BaseModal>
        </div>
    );
};
