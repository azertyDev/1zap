import React, { FC, useCallback, useEffect, useState } from 'react';
import { walletApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'next-i18next';
import dayjs from 'dayjs';
import { Table } from 'components/ui/dashboard/table';
import { ActionsBlock } from 'components/ui/dashboard/table/ActionsBlock';
import { Button } from 'components/ui/button';
import { Pagination } from 'components/ui/pagination/Pagination';
import { useRouter } from 'next/router';
import { FilterCalendar } from 'components/ui/dashboard/table/filterCalendar';
import s from './index.module.scss';
import { BaseModal } from 'components/ui/dashboard/modal/base_modal';
import { Form, FormikProvider, useFormik } from 'formik';
import { useModal } from 'src/hooks/common/useModal';
import { FloatingInput } from 'components/ui/input/float_input';
import { FileUpload } from 'components/ui/upload/file';
import { client_validation } from 'src/validation/client_validation';
import { useSortDataAdminProvider } from 'src/hooks/common/useSortDataAdminProvider';

export const IncomePage: FC = () => {
    const [moderationData, setModerationData] = useState<any>(null);
    const [activeData, setActiveData] = useState<any>(null);
    const { open, handleModalClose, handleModalOpen } = useModal();
    const { t } = useTranslation();

    const [trigger, setTrigger] = useState(false);

    const [filtringByDateMonth, setFiltringByDateMonth] = useState<null | string>(null);
    const [monthModeration, setMonthModeration] = useState(new Date());

    const [filtringByDate, setFiltringByDate] = useState<null | string>(null);
    const [fullDate, setFullDate] = useState<null | string>(null);
    const [month, setMonth] = useState(new Date());

    const { sortBy, sortType, handleSortProducts } = useSortDataAdminProvider();
    const {
        sortBy: sortByAccepted,
        sortType: sortTypeAccepted,
        handleSortProducts: handleSortProductsAccepted,
    } = useSortDataAdminProvider();

    const {
        query: { page, pageSec },
    } = useRouter();

    useEffect(() => {
        (() => {
            walletApi
                .getIncomingRequest(page as string, filtringByDateMonth ? dayjs(monthModeration).format('YYYY-MM') : '')
                .then((res) => setModerationData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, [page, trigger, monthModeration]);

    useEffect(() => {
        (() => {
            walletApi
                .getApprovedRequest(
                    pageSec as string,
                    filtringByDate
                        ? filtringByDate === 'month'
                            ? dayjs(month).format('YYYY-MM')
                            : dayjs(fullDate).format('YYYY-MM-DD')
                        : null
                )
                .then((res) => setActiveData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, [pageSec, trigger, month, fullDate]);

    const formik = useFormik({
        initialValues: { file: '', requestId: '', providerId: '', agreementNumber: '' },
        validationSchema: client_validation.wallet,
        onSubmit: (values) => {
            let formData = new FormData();
            formData.append('file', values.file);
            formData.append('requestId', values.requestId);
            formData.append('providerId', values.providerId);
            formData.append('agreementNumber', values.agreementNumber);
            walletApi
                .approveRequest(formData)
                .then(() => {
                    setTrigger((prev) => !prev);
                    toast.success(t('dashboard:wallet_accept'));
                    handleCloseWallet();
                })
                .catch(() => toast.error(t('helpers:error_sending')));
        },
    });

    const handleOpenWallet = useCallback((providerId: number, id: number) => {
        return () => {
            handleModalOpen();
            formik.setFieldValue('providerId', providerId);
            formik.setFieldValue('requestId', id);
        };
    }, []);

    const handleCloseWallet = useCallback(() => {
        handleModalClose();
        formik.resetForm();
    }, []);

    const cols = [
        {
            Header: t('dashboard:date') as string,
            id: 'eventdate',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YY') as any,
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
            typeProperty: 'date',
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
            Header: t('dashboard:provider') as string,
            accessor: 'companyName',
            disableFilters: true,
            disableSortBy: false,
        },
        {
            Header: t('dashboard:cost') as string,
            accessor: 'coin',
            Cell: ({ cell }: any) => {
                switch (cell.value) {
                    case 100:
                        return `160 000 ${t('common:sum')}`;
                    case 250:
                        return `350 000 ${t('common:sum')}`;
                    case 500:
                        return `600 000 ${t('common:sum')}`;
                    case 1000:
                        return `1 000 000 ${t('common:sum')}`;
                }
            },
            disableFilters: true,
            disableSortBy: false,
        },
        {
            Header: t('dashboard:info') as string,
            accessor: 'info',
            Cell: ({ cell }: any) => {
                return t('dashboard:wallet_up', { price: cell.row.original.coin });
            },
            disableFilters: true,
            disableSortBy: false,
            minWidth: 200,
        },
        {
            Header: t('dashboard:action'),
            disableFilters: true,
            disableSortBy: true,
            maxWidth: 120,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Button variant={'disabled'} onClick={handleOpenWallet(cell.providerId, cell.id)}>
                            {t('dashboard:accept_wallet')}
                        </Button>
                    </ActionsBlock>
                );
            },
        },
    ];
    const colsActive = [
        {
            Header: t('dashboard:date') as string,
            id: 'eventdate',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YY') as any,
            disableFilters: true,
            disableSortBy: true,
            showSort: true,
            typeProperty: 'date',
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
            Header: t('dashboard:provider') as string,
            accessor: 'companyName',
            disableFilters: true,
            disableSortBy: false,
        },
        {
            Header: t('dashboard:cost') as string,
            accessor: 'coin',
            Cell: ({ cell }: any) => {
                switch (cell.value) {
                    case 100:
                        return `160 000 ${t('common:sum')}`;
                    case 250:
                        return `350 000 ${t('common:sum')}`;
                    case 500:
                        return `600 000 ${t('common:sum')}`;
                    case 1000:
                        return `1 000 000 ${t('common:sum')}`;
                }
            },
            disableFilters: true,
            disableSortBy: false,
        },
        {
            Header: t('dashboard:info') as string,
            accessor: 'info',
            Cell: ({ cell }: any) => {
                return t('dashboard:wallet_up', { price: cell.row.original.coin });
            },
            disableFilters: true,
            disableSortBy: false,
            minWidth: 200,
        },
        {
            Header: t('dashboard:action'),
            disableFilters: true,
            disableSortBy: true,
            maxWidth: 120,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Button variant={'disabled'}>{t('dashboard:in_detail')}</Button>
                    </ActionsBlock>
                );
            },
        },
    ];

    return (
        <div>
            <h4 className={s.titles}>{t('dashboard:incoming_wallet')}</h4>
            <FilterCalendar
                setMonth={setMonthModeration}
                month={monthModeration}
                setFiltringByDate={setFiltringByDateMonth}
                showCalendar={false}
            />
            {moderationData?.data && (
                <Table
                    handleSort={handleSortProducts}
                    enableSort
                    data={moderationData?.data}
                    columns={cols}
                    isSecondType
                />
            )}
            {moderationData?.totalPages > 1 && <Pagination pageCount={moderationData?.totalPages} />}

            <h4 className={`${s.titles} ${s.last}`}>{t('dashboard:accepted_wallet')}</h4>
            <FilterCalendar
                setFullDate={setFullDate}
                fullDate={fullDate}
                setMonth={setMonth}
                month={month}
                setFiltringByDate={setFiltringByDate}
            />
            {activeData?.data && (
                <Table
                    handleSort={handleSortProductsAccepted}
                    enableSort
                    data={activeData?.data}
                    columns={colsActive}
                    isSecondType
                />
            )}
            {activeData?.totalPages > 1 && <Pagination pageCount={activeData?.totalPages} isSecPage />}

            <BaseModal
                open={open}
                onClose={handleCloseWallet as any}
                headerContent={
                    <div>
                        <h2>{t('dashboard:accepting_wallet')}</h2>
                    </div>
                }
            >
                <FormikProvider value={formik}>
                    <Form>
                        <div className={s.inputs_wr}>
                            <FloatingInput {...formik.getFieldProps('agreementNumber')} />
                            <FileUpload
                                name="file"
                                title={t('dashboard:upload_doc')}
                                setFieldValue={formik.setFieldValue}
                                accept={',image/*, .pdf, .doc'}
                            />
                        </div>

                        <Button
                            disabled={!formik.dirty || !formik.isValid}
                            variant={!formik.dirty || !formik.isValid ? 'disabled' : 'primary'}
                            fullWidth
                            type={'submit'}
                            disabledPointer={formik.isSubmitting}
                        >
                            {t('dashboard:accrue')}
                        </Button>
                    </Form>
                </FormikProvider>
            </BaseModal>
        </div>
    );
};
