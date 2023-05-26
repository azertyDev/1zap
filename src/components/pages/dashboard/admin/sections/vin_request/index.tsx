import dayjs from 'dayjs';
import Link from 'next/link';
import { FC, useCallback, useEffect, useState } from 'react';
import { Column } from 'react-table';
import { Button } from 'src/components/ui/button';
import { BaseModal } from 'src/components/ui/dashboard/modal/base_modal';
import { Table } from 'src/components/ui/dashboard/table';
import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import { useModal } from 'src/hooks/common/useModal';
import { applicationApi, vinOrderApi } from 'src/utils/api';
import s from './index.module.scss';
import { useTranslation } from 'next-i18next';
import { IVinItem } from 'types';
import { Icon } from 'components/ui/icon';
import { useStepOrder } from 'src/hooks/common/useStepOrder';

import { Field, Form, FormikProvider, useFormik } from 'formik';
import { SelectField } from 'components/ui/select';
import { transformSelectOptions } from 'src/helpers/transformSelectOptions';
import { InputWrapper } from 'components/ui/input/input_wrapper';
import { toast } from 'react-hot-toast';

export const VinRequests: FC<{ query: string }> = ({ query }) => {
    const [data, setData] = useState<any>();
    const { open, handleModalClose, handleModalOpen } = useModal();
    const [toggle, setToggle] = useState(false);
    const { t } = useTranslation();
    const { order, handleOrder } = useStepOrder();

    const [vinData, setVinData] = useState<IVinItem | null>(null);

    const handleVinData = useCallback((data: IVinItem) => {
        return () => {
            setVinData(data);
            handleModalOpen();
        };
    }, []);

    const formik = useFormik({
        initialValues: { status: '' },
        onSubmit: async (values) => {
            vinOrderApi
                .rejectVin(vinData?.id!)
                .then((response) => {
                    setToggle((prev) => !prev);
                    handleModalClose();
                })
                .catch((err) => {
                    toast.error(t('helpers:error_sending'));
                });
        },
    });

    useEffect(() => {
        vinOrderApi
            .fetchVinAction(query)
            .then((response) => {
                setData(response);
            })
            .catch((err) => {
                toast.error(t('helpers:error_getting'));
            });
    }, [query, toggle]);

    const vinRequestCols: Column<any>[] = [
        {
            Header: 'Дата',
            id: 'eventdate',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YYYY') as any,
            disableFilters: true,
            disableSortBy: false,
        },
        {
            Header: 'Время',
            id: 'eventtime',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('h:mm') as any,
            disableFilters: true,
            disableSortBy: false,
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
            accessor: 'status',
            Cell: ({ cell }: any) => t(`dashboard:status.${cell.value}`) as any,
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Город',
            accessor: 'city',
            Cell: ({ cell }: any) => t(`common:selects.${cell.value}`) as any,
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Действия',
            disableFilters: true,
            disableSortBy: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Button variant="primary" fullWidth onClick={handleVinData(cell)}>
                            Открыть
                        </Button>
                    </ActionsBlock>
                );
            },
        },
    ];

    console.log(vinData);
    return (
        <div className={s.root}>
            <div className={s.btn_wr}>
                {query !== 'moderation' && (
                    <Link href={'/dashboard/vin-requests'}>
                        <Button variant={'primary'}>
                            <Icon name={'archive'} size={20} color={'#fff'} />
                            {t('dashboard:status.moderation')}
                        </Button>
                    </Link>
                )}

                {query !== 'primary' && (
                    <Link href={'/dashboard/vin-requests/primary'}>
                        <Button variant={'primary'}>
                            <Icon name={'all_inbox'} size={20} color={'#fff'} /> {t('dashboard:status.primary')}
                        </Button>
                    </Link>
                )}

                {query !== 'completed' && (
                    <Link href={'/dashboard/vin-requests/completed'}>
                        <Button variant={'primary'}>
                            <Icon name={'unarchive'} size={20} color={'#fff'} />
                            {t('dashboard:status.completed')}
                        </Button>
                    </Link>
                )}
            </div>
            <h4 className={s.sub_title}>{t(`dashboard:status.${query}`)}</h4>
            {data?.data.length > 0 && <Table data={data?.data} columns={vinRequestCols} />}

            <BaseModal
                open={open}
                onClose={handleModalClose}
                headerContent={
                    vinData ? (
                        <div>
                            <h2>Детали VIN запроса</h2>
                            <span>
                                {dayjs(vinData.createdAt).format('DD/MM/YYYY')} в{' '}
                                {dayjs(vinData.createdAt).format('h:mm')}
                            </span>
                        </div>
                    ) : (
                        <div></div>
                    )
                }
            >
                <div>
                    <div className={s.modal_tabs}>
                        <div className={order === 1 ? s.active : ''} onClick={handleOrder(1)}>
                            {t('dashboard:details')}
                        </div>
                        <div className={order === 2 ? s.active : ''} onClick={handleOrder(2)}>
                            {t('dashboard:contacts')}
                        </div>
                        <div className={order === 3 ? s.active : ''} onClick={handleOrder(3)}>
                            {t('dashboard:moderation')}
                        </div>
                    </div>
                    {order === 1 && vinData && (
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
                        </div>
                    )}
                    {order === 2 && vinData && (
                        <div>
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
                        </div>
                    )}
                    {order === 3 && vinData && query !== 'completed' && (
                        <div>
                            {query === 'moderation' && (
                                <h6 className={s.modal_tabs_title}> {t('dashboard:comments')}</h6>
                            )}

                            <FormikProvider value={formik}>
                                <Form>
                                    <InputWrapper>
                                        <Field
                                            component={SelectField}
                                            name="status"
                                            label={t('common:selects.status')}
                                            options={[{ value: 'rejected', label: t('dashboard:status.rejected') }]}
                                        />
                                    </InputWrapper>

                                    <Button
                                        disabled={!formik.dirty || !formik.isValid}
                                        variant={!formik.dirty || !formik.isValid ? 'disabled' : 'primary'}
                                        fullWidth
                                        type={'submit'}
                                    >
                                        {t('common:save')}
                                    </Button>
                                </Form>
                            </FormikProvider>
                        </div>
                    )}
                </div>
            </BaseModal>
        </div>
    );
};
