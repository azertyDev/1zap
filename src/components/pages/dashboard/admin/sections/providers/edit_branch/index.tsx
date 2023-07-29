import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { branchApi, staticParamsApi } from 'src/utils/api';
import { Field, FieldArray, Form, FormikHelpers, FormikProvider, useFormik } from 'formik';
import { initialValues } from 'components/pages/dashboard/cabinet/sections/main/sub_pages/branches/form/initialValues';
import { checkPhone } from 'src/helpers/checkPhone';
import { toast } from 'react-hot-toast';
import { Heading } from 'components/ui/dashboard/heading';
import s from '../index.module.scss';
import { StandartInput } from 'components/ui/input/standart_input';
import { Map, Marker } from 'pigeon-maps';
import { Icon } from 'components/ui/icon';
import { ZoomControl } from 'components/ui/map/map_controls/zoom';
import { SelectField } from 'components/ui/select';
import { transformSelectOptions } from 'src/helpers/transformSelectOptions';
import { Accordion } from 'components/ui/accordion';
import { Checkbox } from 'components/ui/dashboard/checkbox';
import { IImage } from 'types';
import { ImageUpload } from 'components/ui/upload/image';
import { Button } from 'components/ui/button';
import { maptiler } from 'pigeon-maps/providers';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');

export const EditBranchByProvider = () => {
    const {
        query: { id },
        push,
        back,
    } = useRouter();

    const [params, setParams] = useState<any>();
    const [branch, setBranch] = useState<any>();
    const [location, setLocation] = useState<any>(branch?.location);
    const { t } = useTranslation();

    const defaultOptions = [
        {
            value: '',
            label: '',
        },
    ];

    const staticParams = async () => {
        await staticParamsApi
            .getParams()
            .then((res) => {
                setParams(res);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        staticParams();
    }, []);

    useEffect(() => {
        branchApi.getBranchByIdAdmin(id as string).then((branch) => {
            setBranch(branch);
        });
    }, [id]);

    const handleMap = (
        { event, latLng, pixel }: { event: MouseEvent; latLng: [number, number]; pixel: [number, number] },
        field: string
    ) => {
        setLocation(latLng);
        formik.setFieldValue(field, JSON.stringify(latLng));
    };

    const onSubmit = async (values: any, {}: FormikHelpers<typeof initialValues>) => {
        await branchApi
            .editBranchByAdmin(id as any, { ...values, phone: checkPhone(values.phone) })
            .then(() => {
                toast.success(t('dashboard:branch_changed'), {
                    duration: 5000,
                });

                back();
            })
            .catch(() => toast.error(t('helpers:error_sending')));
    };

    const formik = useFormik({
        onSubmit,
        initialValues: !!branch ? { ...branch, phone: branch.phone.slice(4) } : initialValues,
        enableReinitialize: true,
    });

    return (
        <>
            <Heading title={t(`dashboard:branch_settings`)} desc={t(`dashboard:edit_branch`)} />

            <FormikProvider value={formik}>
                {branch && (
                    <Form>
                        <div className={s.formGroup}>
                            <div className={s.row}>
                                <div className={s.block}>
                                    <StandartInput
                                        label="dashboard:providerBranch.phisicalAddress"
                                        {...formik.getFieldProps(`phisicalAddress`)}
                                    />
                                    <StandartInput
                                        label="dashboard:providerBranch.branchName"
                                        {...formik.getFieldProps(`branchName`)}
                                    />
                                    <StandartInput
                                        label="dashboard:providerBranch.managerName"
                                        {...formik.getFieldProps(`managerName`)}
                                    />

                                    <div>
                                        <FieldArray
                                            name="phones"
                                            render={(helperProps) => {
                                                return formik.values.phones && formik.values.phones.length ? (
                                                    formik.values.phones?.map((phone: any, i: number) => {
                                                        return (
                                                            <div key={i}>
                                                                <StandartInput
                                                                    isPhone
                                                                    label="dashboard:providerBranch.phone"
                                                                    {...formik.getFieldProps(`phones[${i}].number`)}
                                                                    setFieldValue={formik.setFieldValue}
                                                                />

                                                                {formik?.values?.phones?.length > 0 && (
                                                                    <div className={s.actionButtons}>
                                                                        <span
                                                                            onClick={() => {
                                                                                helperProps.push({ number: '' });
                                                                            }}
                                                                        >
                                                                            <Icon name="add_circle" size={18} />
                                                                            {t('dashboard:add')}
                                                                        </span>
                                                                        <span onClick={() => helperProps.remove(i)}>
                                                                            <Icon name="delete" size={18} />
                                                                            {t('dashboard:delete')}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <div className={s.actionButtons}>
                                                        <span
                                                            onClick={() => helperProps.push({ number: '' })}
                                                            style={{ whiteSpace: 'nowrap' }}
                                                        >
                                                            <Icon name="add_circle" size={18} />
                                                            {t('dashboard:additional_phone')}
                                                        </span>
                                                    </div>
                                                );
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className={s.block}>
                                    {!!branch?.location && (
                                        <>
                                            <div style={{ height: '100%', maxHeight: '245px' }}>
                                                <Map
                                                    provider={maptilerProvider}
                                                    dprs={[1, 2]}
                                                    defaultCenter={JSON.parse(branch?.location)}
                                                    defaultZoom={15}
                                                    // metaWheelZoom
                                                    onClick={(event) => handleMap(event, `location`)}
                                                >
                                                    <Marker anchor={location}>
                                                        <Icon name="location_on" size={30} color="#C6303C" />
                                                    </Marker>

                                                    <ZoomControl />
                                                </Map>
                                            </div>

                                            <StandartInput
                                                label="dashboard:providerBranch.landmark"
                                                {...formik.getFieldProps(`landmark`)}
                                            />
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className={s.row}>
                                <div className={`${s.row} ${s.gap_30}`}>
                                    <Field
                                        component={SelectField}
                                        name={`branchType`}
                                        label="dashboard:providerBranch.branchType"
                                        options={params ? transformSelectOptions(params.branchType) : defaultOptions}
                                    />
                                    <Field
                                        component={SelectField}
                                        name={`city`}
                                        label="dashboard:providerBranch.city"
                                        options={params ? transformSelectOptions(params.city) : defaultOptions}
                                    />
                                </div>

                                <div className={`${s.gap_30}`}>
                                    <div className={s.block}>
                                        <div className={`${s.row} ${s.gap_30}`}>
                                            <Field
                                                component={SelectField}
                                                name={`workingDays`}
                                                label="dashboard:workingDays"
                                                options={
                                                    params ? transformSelectOptions(params.workingDays) : defaultOptions
                                                }
                                            />

                                            <Field
                                                component={SelectField}
                                                name={`workingSchedule`}
                                                label="dashboard:providerBranch.workingSchedule"
                                                options={params ? params.workingSchedule : defaultOptions}
                                            />
                                        </div>
                                        <div className={`${s.row} ${s.gap_30}`}>
                                            <Field
                                                component={SelectField}
                                                name={`weekendDays`}
                                                label="dashboard:weekendDays"
                                                options={
                                                    params ? transformSelectOptions(params.weekendDays) : defaultOptions
                                                }
                                            />
                                            <Field
                                                component={SelectField}
                                                name={`weekendSchedule`}
                                                label="dashboard:providerBranch.weekendSchedule"
                                                options={params ? params.weekendSchedule : defaultOptions}
                                            />
                                        </div>
                                        <div className={`${s.row} ${s.gap_30}`}>
                                            <Field
                                                component={SelectField}
                                                name={`weekend`}
                                                label="dashboard:providerBranch.weekend"
                                                options={
                                                    params ? transformSelectOptions(params.weekend) : defaultOptions
                                                }
                                            />
                                            <Field
                                                component={SelectField}
                                                name={`breakTime`}
                                                label="dashboard:providerBranch.breakTime"
                                                options={
                                                    params
                                                        ? [
                                                              ...params.breakTime.slice(0, 2),
                                                              {
                                                                  value: params.breakTime[2].value,
                                                                  label: t(`dashboard:${params.breakTime[2].label}`),
                                                              },
                                                          ]
                                                        : defaultOptions
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={s.checkboxGroup}>
                                <Accordion title="providerBranch.payment.title" open>
                                    <Checkbox
                                        label="providerBranch.payment.cash"
                                        {...formik.getFieldProps(`payment[0].isActive`)}
                                    />
                                    <Checkbox
                                        label="providerBranch.payment.card"
                                        {...formik.getFieldProps(`payment[1].isActive`)}
                                    />
                                    <Checkbox
                                        label="providerBranch.payment.transfer"
                                        {...formik.getFieldProps(`payment[2].isActive`)}
                                    />
                                </Accordion>
                                <Accordion title="providerBranch.delivery.title" open>
                                    <Checkbox
                                        label="providerBranch.delivery.pickup"
                                        {...formik.getFieldProps(`delivery[0].isActive`)}
                                    />
                                    <Checkbox
                                        label="providerBranch.delivery.courier"
                                        {...formik.getFieldProps(`delivery[1].isActive`)}
                                    />
                                </Accordion>
                                <Accordion title="providerBranch.service.title" open>
                                    <Checkbox
                                        label="providerBranch.service.tireFitting"
                                        {...formik.getFieldProps(`service[0].isActive`)}
                                    />
                                    <Checkbox
                                        label="providerBranch.service.autoService"
                                        {...formik.getFieldProps(`service[1].isActive`)}
                                    />
                                    <Checkbox
                                        label="providerBranch.service.partSelection"
                                        {...formik.getFieldProps(`service[2].isActive`)}
                                    />
                                </Accordion>
                                <Accordion title="providerBranch.clientType.title" open>
                                    <Checkbox
                                        label="providerBranch.clientType.legal"
                                        {...formik.getFieldProps(`clientType[0].isActive`)}
                                    />
                                    <Checkbox
                                        label="providerBranch.clientType.individual"
                                        {...formik.getFieldProps(`clientType[1].isActive`)}
                                    />
                                </Accordion>
                            </div>

                            <div className={s.imgGroup}>
                                <FieldArray
                                    name="images"
                                    render={(helperProps) => {
                                        return formik.values?.images && formik.values?.images.length ? (
                                            formik.values?.images?.map((image: IImage, i: number) => {
                                                return (
                                                    <div key={i}>
                                                        <ImageUpload
                                                            id={image.id}
                                                            preview={`${image.url}`}
                                                            setFieldValue={formik.setFieldValue}
                                                            name={`images[${i}]`}
                                                        />
                                                        {formik.values?.images.length > 0 &&
                                                            formik.values?.images.length !== 5 && (
                                                                <div className={s.actionButtons}>
                                                                    <span
                                                                        onClick={() =>
                                                                            helperProps.push({ id: null, url: '' })
                                                                        }
                                                                    >
                                                                        <Icon name="add_circle" size={18} />
                                                                        {t('dashboard:add')}
                                                                    </span>
                                                                    <span onClick={() => helperProps.remove(i)}>
                                                                        <Icon name="delete" size={18} />
                                                                        {t('dashboard:delete')}
                                                                    </span>
                                                                </div>
                                                            )}
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className={s.actionButtons}>
                                                <span
                                                    onClick={() => helperProps.push({ id: null, url: '' })}
                                                    style={{ whiteSpace: 'nowrap' }}
                                                >
                                                    <Icon name="add_circle" size={18} />
                                                    {t('dashboard:add_photo')}
                                                </span>
                                            </div>
                                        );
                                    }}
                                />
                            </div>

                            <div className={s.actionButtons}>
                                <Button
                                    variant="disabled"
                                    type="reset"
                                    onClick={() => push(`/dashboard/providers/branch?id=${id}`)}
                                >
                                    {t('common:cancel')}
                                </Button>
                                <Button variant="primary" type="submit" disabledPointer={formik.isSubmitting}>
                                    {t('dashboard:refresh')}
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
            </FormikProvider>
        </>
    );
};
