import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Field, FieldArray, Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { Heading } from 'src/components/ui/dashboard/heading';
import { branchApi, staticParamsApi } from 'src/utils/api';
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
import s from '../../../index.module.scss';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');

export const EditForm = (props: any) => {
    const {
        query: { id },
    } = useRouter();
    const { pageProps } = props;
    const [params, setParams] = useState<any>();
    const [branch, setBranch] = useState<any>();
    console.log(branch);

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
        branchApi.getBranchById(id as unknown as number).then((branch) => {
            setBranch(branch);
        });
    }, [id]);

    const handleMap = (
        { event, latLng, pixel }: { event: MouseEvent; latLng: [number, number]; pixel: [number, number] },
        field: string
    ) => {
        formik.setFieldValue(field, JSON.stringify(latLng));
    };

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        console.log(values);
    };

    const formik = useFormik({
        onSubmit,
        initialValues: !!branch ? branch : initialValues,
        // validationSchema,
        enableReinitialize: true,
    });

    const coords = branch?.location
        .replace(/\[|\]/g, '')
        .split(',')
        .map(function (el: any) {
            return +el;
        });

    return (
        <>
            <Heading title={pageProps.title} desc={pageProps.desc} />

            <FormikProvider value={formik}>
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
                                <StandartInput
                                    isPhone
                                    label="dashboard:providerBranch.phone"
                                    {...formik.getFieldProps(`phone`)}
                                    setFieldValue={formik.setFieldValue}
                                />
                            </div>

                            <div className={s.block}>
                                <Map
                                    provider={maptilerProvider}
                                    dprs={[1, 2]}
                                    defaultCenter={[41.31172327941058, 69.2818072781773]}
                                    defaultZoom={15}
                                    // metaWheelZoom
                                    onClick={(event) => handleMap(event, `location`)}
                                >
                                    <Marker anchor={coords as [number, number]}>
                                        <Icon name="location_on" size={30} color="#C6303C" />
                                    </Marker>

                                    <ZoomControl />
                                </Map>

                                <StandartInput
                                    label="dashboard:providerBranch.landmark"
                                    {...formik.getFieldProps(`landmark`)}
                                />
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
                                            name={`workingSchedule`}
                                            label="dashboard:providerBranch.workingSchedule"
                                            options={
                                                params ? transformSelectOptions(params.workingSchedule) : defaultOptions
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
                                            options={params ? transformSelectOptions(params.weekend) : defaultOptions}
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
                                    label="providerBranch.payment.cash"
                                    // checked={payment[0].isActive}
                                    {...formik.getFieldProps(`payment[0].isActive`)}
                                />
                                <Checkbox
                                    label="providerBranch.payment.card"
                                    // checked={branch.payment[1].isActive}
                                    {...formik.getFieldProps(`payment[1].isActive`)}
                                />
                                <Checkbox
                                    label="providerBranch.payment.transfer"
                                    // checked={branch.payment[2].isActive}
                                    {...formik.getFieldProps(`payment[2].isActive`)}
                                />
                            </Accordion>
                            <Accordion title="providerBranch.delivery.title" open>
                                <Checkbox
                                    label="providerBranch.delivery.pickup"
                                    // checked={branch.delivery[0].isActive}
                                    {...formik.getFieldProps(`delivery[0].isActive`)}
                                />
                                <Checkbox
                                    label="providerBranch.delivery.courier"
                                    // checked={branch.delivery[1].isActive}
                                    {...formik.getFieldProps(`delivery[1].isActive`)}
                                />
                            </Accordion>
                            <Accordion title="providerBranch.service.title" open>
                                <Checkbox
                                    label="providerBranch.service.tireFitting"
                                    // checked={branch.service[0].isActive}
                                    {...formik.getFieldProps(`service[0].isActive`)}
                                />
                                <Checkbox
                                    label="providerBranch.service.autoService"
                                    // checked={branch.service[1].isActive}
                                    {...formik.getFieldProps(`service[1].isActive`)}
                                />
                                <Checkbox
                                    label="providerBranch.service.partSelection"
                                    // checked={branch.service[2].isActive}
                                    {...formik.getFieldProps(`service[2].isActive`)}
                                />
                            </Accordion>
                            <Accordion title="providerBranch.clientType.title" open>
                                <Checkbox
                                    label="providerBranch.clientType.legal"
                                    // checked={branch.clientType[0].isActive}
                                    {...formik.getFieldProps(`clientType[0].isActive`)}
                                />
                                <Checkbox
                                    label="providerBranch.clientType.individual"
                                    // checked={branch.clientType[1].isActive}
                                    {...formik.getFieldProps(`clientType[1].isActive`)}
                                />
                            </Accordion>
                        </div>

                        {/* <div className={s.imgGroup}>
                            <FieldArray
                                name={`providerBranch.[${index}].images`}
                                render={(helperProps) => {
                                    return branch.images && branch.images.length ? (
                                        branch.images?.map((image: IImage, i: number) => {
                                            return (
                                                <div key={i}>
                                                    <ImageUpload
                                                        preview={`${image.url}`}
                                                        setFieldValue={form.setFieldValue}
                                                        name={`providerBranch.[${index}].images[${i}]`}
                                                    />
                                                    {branch.images.length > 0 && branch.images.length !== 5 && (
                                                        <div className={s.actionButtons}>
                                                            <span onClick={() => helperProps.push({ url: '' })}>
                                                                <Icon name="add_circle" size={18} />
                                                                Добавить
                                                            </span>
                                                            <span onClick={() => helperProps.remove(i)}>
                                                                <Icon name="delete" size={18} />
                                                                Удалить
                                                            </span>
                                                        </div>
                                                    )}
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
                                                Добавить фотографию
                                            </span>
                                        </div>
                                    );
                                }}
                            />
                        </div> */}
                    </div>
                </Form>
            </FormikProvider>
        </>
    );
};
