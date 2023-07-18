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
import { useTranslation } from 'next-i18next';
import { IVinItem } from 'types';
import { toast } from 'react-hot-toast';
import { VinSelectProvider } from 'components/pages/dashboard/cabinet/sections/vin_request/items/select';
import { Pagination } from 'components/ui/pagination/Pagination';
import { useRouter } from 'next/router';
import { useSortDataAdminProvider } from 'src/hooks/common/useSortDataAdminProvider';

export const IncominRequestsAccepted = () => {
    const [data, setData] = useState<any>();
    const { t } = useTranslation();
    const { open, handleModalClose, handleModalOpen } = useModal(false);
    const [modalOrder, setModalOrder] = useState(0);
    const [trigger, setTrigger] = useState(false);
    const [vinData, setVinData] = useState<IVinItem | null>(null);
    const { sortBy, sortType, handleSortProducts } = useSortDataAdminProvider();
    const {
        query: { page },
    } = useRouter();

    const handleModalOrder = useCallback((num: number) => {
        return () => setModalOrder(num);
    }, []);

    const handleVinData = useCallback((data: IVinItem, order: number) => {
        return () => {
            setVinData(data);
            handleModalOrder(order)();
            handleModalOpen();
        };
    }, []);

    useEffect(() => {
        vinOrderApi
            .getAllVinByProvider(page as string, sortType, sortBy)
            .then((response) => {
                setData(response);
            })
            .catch((err) => {
                toast.error(t('helpers:error_getting'));
            });
    }, [trigger, page, sortBy, sortType]);

    const vinRequestCols = [
        {
            Header: t('dashboard:date') as string,
            id: 'eventdate',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YYYY') as any,
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
            typeProperty: 'created_at',
            width: 80,
        },
        {
            Header: t('dashboard:time') as string,
            id: 'eventtime',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs.tz(cell.value, 'Asia/Tashkent').format('H:mm') as any,
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
            width: 50,
        },
        {
            Header: t('dashboard:status_noun') as string,
            accessor: 'status',
            Cell: ({ cell }: any) => t(`dashboard:status.${cell.value}`) as any,
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
        },
        {
            Header: t('dashboard:req_detail') as string,
            disableFilters: true,
            disableSortBy: true,
            width: 120,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Button variant="primary" fullWidth onClick={handleVinData(cell, 1)}>
                            {t('common:open')}
                        </Button>
                    </ActionsBlock>
                );
            },
        },
        {
            Header: t('dashboard:client_contact') as string,
            disableFilters: true,
            disableSortBy: true,
            width: 120,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Button variant="primary" fullWidth onClick={handleVinData(cell, 2)}>
                            {t('common:open')}
                        </Button>
                    </ActionsBlock>
                );
            },
        },
    ];

    return (
        <div className={s.root}>
            <h2> {t('dashboard:accepted_req')}</h2>

            <div className={s.link}>
                <Link href={'/cabinet/incoming_requests?page=1'}>
                    <Button variant={'primary'}>
                        <Icon name={'all_inbox'} size={20} color={'#fff'} />
                        {t('dashboard:new_req')}
                    </Button>
                </Link>
            </div>

            {data?.data.length > 0 && (
                <Table handleSort={handleSortProducts} enableSort data={data?.data} columns={vinRequestCols} />
            )}
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
                {vinData && modalOrder === 1 && (
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
                            <div>
                                <p> {t('dashboard:payment')}</p>
                                <p>{t(`common:selects.${vinData.payment}`)}</p>
                            </div>
                        </div>
                        <div className={s.modal_description}>
                            <h6 className={s.modal_tabs_title}> {t('dashboard:info_detail')}</h6>
                            <p>{vinData.description}</p>
                        </div>
                        <div className={s.control_btns}>
                            <Button variant={'primary'} onClick={handleModalOrder(2)}>
                                {t('dashboard:client_contact')}
                            </Button>

                            <Button variant={'disabled'} onClick={handleModalClose}>
                                {t('common:close')}
                            </Button>
                        </div>
                    </div>
                )}

                {vinData && (modalOrder === 2 || modalOrder === 3) && (
                    <div>
                        {modalOrder === 2 && (
                            <>
                                <h6 className={s.modal_tabs_title}> {t('dashboard:info_client')}</h6>
                                <div className={s.modal_table_wr}>
                                    <div>
                                        <p> {t('dashboard:name')}</p>
                                        <p>{vinData.customer.username}</p>
                                    </div>
                                    <div>
                                        <p> {t('dashboard:city')}</p>
                                        <p> {t(`common:selects.${vinData.city}`)}</p>
                                    </div>
                                    <div>
                                        <p> {t('dashboard:number')}</p>
                                        <p>{vinData.customer.phone}</p>
                                    </div>
                                    <div>
                                        <p> {t('dashboard:payment')}</p>
                                        <p>{t(`common:selects.${vinData.payment}`)}</p>
                                    </div>
                                </div>
                            </>
                        )}

                        <VinSelectProvider
                            status={vinData.status}
                            vinId={vinData.id}
                            closeModal={handleModalClose}
                            trigger={setTrigger}
                            setOrder={handleModalOrder}
                            modalOrder={modalOrder}
                            open={open}
                        >
                            <Button variant={'primary'} onClick={handleModalOrder(1)}>
                                {t('dashboard:req_detail')}
                            </Button>
                        </VinSelectProvider>
                    </div>
                )}
            </BaseModal>
        </div>
    );
};
