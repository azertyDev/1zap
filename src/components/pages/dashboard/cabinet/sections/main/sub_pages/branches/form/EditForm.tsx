import { useEffect, useState } from 'react';
import { Field, FieldArray, Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Heading } from 'src/components/ui/dashboard/heading';
import { branchApi, providerApi, staticParamsApi } from 'src/utils/api';
import { initialValues } from './initialValues';
import { Accordion } from 'src/components/ui/accordion';
import { Checkbox } from 'src/components/ui/dashboard/checkbox';
import { Map, Marker } from 'pigeon-maps';
import { StandartInput } from 'src/components/ui/input/standart_input';
import { maptiler } from 'pigeon-maps/providers';
import { Icon } from 'src/components/ui/icon';
import { SelectField } from 'src/components/ui/select';
import { ZoomControl } from 'src/components/ui/map/map_controls/zoom';
import { transformSelectOptions } from 'src/helpers/transformSelectOptions';
import { Button } from 'src/components/ui/button';
import { ImageUpload } from 'src/components/ui/upload/image';
import { IImage } from 'types';
import s from '../../../index.module.scss';
import { useTranslation } from 'next-i18next';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');

export const EditForm = (props: any) => {
    const {
        query: { id },
        push,
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
        providerApi.getBranchById(id as string).then((branch) => {
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
        await branchApi.updateBranch(id as any, values);
        push('/cabinet/main/branches');
    };

    const formik = useFormik({
        onSubmit,
        initialValues: !!branch ? branch : initialValues,
        // validationSchema,
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
                                        disabled
                                        label="dashboard:providerBranch.phisicalAddress"
                                        {...formik.getFieldProps(`phisicalAddress`)}
                                    />
                                    <StandartInput
                                        disabled
                                        label="dashboard:providerBranch.branchName"
                                        {...formik.getFieldProps(`branchName`)}
                                    />
                                    <StandartInput
                                        disabled
                                        label="dashboard:providerBranch.managerName"
                                        {...formik.getFieldProps(`managerName`)}
                                    />
                                    <StandartInput
                                        isPhone
                                        label="dashboard:providerBranch.phone"
                                        {...formik.getFieldProps(`phone`)}
                                        setFieldValue={formik.setFieldValue}
                                    />
                                </div>

                                <div className={`${s.block} ${s.block_map_edit}`}>
                                    {!!branch?.location && (
                                        <>
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

                                            <StandartInput
                                                disabled
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
                                        isDisabled
                                        component={SelectField}
                                        name={`branchType`}
                                        label="dashboard:providerBranch.branchType"
                                        options={params ? transformSelectOptions(params.branchType) : defaultOptions}
                                    />
                                    <Field
                                        isDisabled
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
                                                name={`workingSchedule`}
                                                label="dashboard:providerBranch.workingSchedule"
                                                options={params ? params.workingSchedule : defaultOptions}
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
                                                options={params ? params.breakTime : defaultOptions}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={s.checkboxGroup}>
                                <Accordion title="providerBranch.payment.title" open>
                                    <Checkbox
                                        disabled
                                        label="providerBranch.payment.cash"
                                        {...formik.getFieldProps(`payment[0].isActive`)}
                                    />
                                    <Checkbox
                                        disabled
                                        label="providerBranch.payment.card"
                                        {...formik.getFieldProps(`payment[1].isActive`)}
                                    />
                                    <Checkbox
                                        disabled
                                        label="providerBranch.payment.transfer"
                                        {...formik.getFieldProps(`payment[2].isActive`)}
                                    />
                                </Accordion>
                                <Accordion title="providerBranch.delivery.title" open>
                                    <Checkbox
                                        disabled
                                        label="providerBranch.delivery.pickup"
                                        {...formik.getFieldProps(`delivery[0].isActive`)}
                                    />
                                    <Checkbox
                                        disabled
                                        label="providerBranch.delivery.courier"
                                        {...formik.getFieldProps(`delivery[1].isActive`)}
                                    />
                                </Accordion>
                                <Accordion title="providerBranch.service.title" open>
                                    <Checkbox
                                        disabled
                                        label="providerBranch.service.tireFitting"
                                        {...formik.getFieldProps(`service[0].isActive`)}
                                    />
                                    <Checkbox
                                        disabled
                                        label="providerBranch.service.autoService"
                                        {...formik.getFieldProps(`service[1].isActive`)}
                                    />
                                    <Checkbox
                                        disabled
                                        label="providerBranch.service.partSelection"
                                        {...formik.getFieldProps(`service[2].isActive`)}
                                    />
                                </Accordion>
                                <Accordion title="providerBranch.clientType.title" open>
                                    <Checkbox
                                        disabled
                                        label="providerBranch.clientType.legal"
                                        {...formik.getFieldProps(`clientType[0].isActive`)}
                                    />
                                    <Checkbox
                                        disabled
                                        label="providerBranch.clientType.individual"
                                        {...formik.getFieldProps(`clientType[1].isActive`)}
                                    />
                                </Accordion>
                            </div>

                            <div className={s.imgGroup}>
                                <FieldArray
                                    name={`images`}
                                    render={(helperProps) => {
                                        return branch?.images && branch?.images.length ? (
                                            branch?.images?.map((image: IImage, i: number) => {
                                                return (
                                                    <div key={i}>
                                                        <ImageUpload
                                                            preview={`${image.url}`}
                                                            setFieldValue={formik.setFieldValue}
                                                            name={`images[${i}]`}
                                                        />
                                                        {/*{branch.images.length > 0 && branch.images.length !== 5 && (*/}
                                                        {/*    <div className={s.actionButtons}>*/}
                                                        {/*        <span onClick={() => helperProps.push({ url: '' })}>*/}
                                                        {/*            <Icon name="add_circle" size={18} />*/}
                                                        {/*            Добавить*/}
                                                        {/*        </span>*/}
                                                        {/*        <span onClick={() => helperProps.remove(i)}>*/}
                                                        {/*            <Icon name="delete" size={18} />*/}
                                                        {/*            Удалить*/}
                                                        {/*        </span>*/}
                                                        {/*    </div>*/}
                                                        {/*)}*/}
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className={s.actionButtons}>
                                                <span
                                                    onClick={() => helperProps.push({ url: '' })}
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
                                <Button variant="disabled" type="reset" onClick={() => push('/cabinet/main/branches')}>
                                    {t('common:cancel')}
                                </Button>
                                <Button variant="primary" type="submit">
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
