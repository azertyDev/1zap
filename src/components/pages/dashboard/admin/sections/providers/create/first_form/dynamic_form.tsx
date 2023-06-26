import { FC, useEffect, useState } from 'react';
import { FieldArrayRenderProps, Field, FieldArray } from 'formik';
import { StandartInput } from 'src/components/ui/input/standart_input';
import { Icon } from 'src/components/ui/icon';
import { Map, Marker } from 'pigeon-maps';
import { SelectField } from 'src/components/ui/select';
import { Accordion } from 'src/components/ui/accordion';
import { Checkbox } from 'src/components/ui/dashboard/checkbox';
import { ImageUpload } from 'src/components/ui/upload/image';
import { maptiler } from 'pigeon-maps/providers';
import { ZoomControl } from 'src/components/ui/map/map_controls/zoom';
import { staticParamsApi } from 'src/utils/api';
import { transformSelectOptions } from 'src/helpers/transformSelectOptions';
import { providerValues } from './initialValues';
import { IBranchData, IImage } from 'types';
import s from '../index.module.scss';
import { useTranslation } from 'next-i18next';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');

export const DynamicForm: FC<any> = (props: FieldArrayRenderProps) => {
    const { form, ...rest } = props;
    const [params, setParams] = useState<any>();
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

    const handleMap = (
        { event, latLng, pixel }: { event: MouseEvent; latLng: [number, number]; pixel: [number, number] },
        field: string
    ) => {
        form.setFieldValue(field, JSON.stringify(latLng));
    };

    return form?.values.providerBranch && form?.values.providerBranch.length > 0 ? (
        form?.values.providerBranch.map((branch: IBranchData, index: number) => {
            const coords = branch.location
                .replace(/\[|\]/g, '')
                .split(',')
                .map(function (el) {
                    return +el;
                });

            return (
                <div className={s.formGroup} key={index}>
                    <div className={s.row}>
                        <div className={s.block}>
                            <StandartInput
                                label="dashboard:providerBranch.phisicalAddress"
                                {...form.getFieldProps(`providerBranch[${index}].phisicalAddress`)}
                            />
                            <StandartInput
                                label="dashboard:providerBranch.branchName"
                                {...form.getFieldProps(`providerBranch[${index}].branchName`)}
                            />
                            <StandartInput
                                label="dashboard:providerBranch.managerName"
                                {...form.getFieldProps(`providerBranch[${index}].managerName`)}
                            />
                            <StandartInput
                                isPhone
                                label="dashboard:providerBranch.phone"
                                {...form.getFieldProps(`providerBranch[${index}].phone`)}
                                setFieldValue={form.setFieldValue}
                            />
                        </div>

                        <div className={s.block}>
                            <Map
                                // boxClassname={s.map}
                                provider={maptilerProvider}
                                dprs={[1, 2]}
                                defaultCenter={[41.31172327941058, 69.2818072781773]}
                                defaultZoom={15}
                                // metaWheelZoom
                                onClick={(event) => handleMap(event, `providerBranch[${index}].location`)}
                            >
                                {branch.location ? (
                                    <Marker anchor={coords as [number, number]}>
                                        <Icon name="location_on" size={30} color="#C6303C" />
                                    </Marker>
                                ) : null}

                                <ZoomControl />
                            </Map>

                            <StandartInput
                                label="dashboard:providerBranch.landmark"
                                {...form.getFieldProps(`providerBranch[${index}].landmark`)}
                            />
                        </div>
                    </div>

                    <div className={s.row}>
                        <div className={`${s.row} ${s.gap_30}`}>
                            <Field
                                component={SelectField}
                                name={`providerBranch[${index}].branchType`}
                                label="dashboard:providerBranch.branchType"
                                options={params ? transformSelectOptions(params.branchType) : defaultOptions}
                            />
                            <Field
                                component={SelectField}
                                name={`providerBranch[${index}].city`}
                                label="dashboard:providerBranch.city"
                                options={params ? transformSelectOptions(params.city) : defaultOptions}
                            />
                        </div>

                        <div className={`${s.row} ${s.gap_30}`}>
                            <div className={s.block}>
                                <div className={`${s.row} ${s.gap_30}`}>
                                    <Field
                                        component={SelectField}
                                        name={`providerBranch[${index}].workingSchedule`}
                                        label="dashboard:providerBranch.workingSchedule"
                                        options={params ? params.workingSchedule : defaultOptions}
                                    />
                                    <Field
                                        component={SelectField}
                                        name={`providerBranch[${index}].weekendSchedule`}
                                        label="dashboard:providerBranch.weekendSchedule"
                                        options={params ? params.weekendSchedule : defaultOptions}
                                    />
                                </div>
                                <div className={`${s.row} ${s.gap_30}`}>
                                    <Field
                                        component={SelectField}
                                        name={`providerBranch[${index}].weekend`}
                                        label="dashboard:providerBranch.weekend"
                                        options={params ? transformSelectOptions(params.weekend) : defaultOptions}
                                    />
                                    <Field
                                        component={SelectField}
                                        name={`providerBranch[${index}].breakTime`}
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
                                checked={branch.payment[0].isActive}
                                {...form.getFieldProps(`providerBranch[${index}].payment[0].isActive`)}
                            />
                            <Checkbox
                                label="providerBranch.payment.card"
                                checked={branch.payment[1].isActive}
                                {...form.getFieldProps(`providerBranch[${index}].payment[1].isActive`)}
                            />
                            <Checkbox
                                label="providerBranch.payment.transfer"
                                checked={branch.payment[2].isActive}
                                {...form.getFieldProps(`providerBranch[${index}].payment[2].isActive`)}
                            />
                        </Accordion>
                        <Accordion title="providerBranch.delivery.title" open>
                            <Checkbox
                                label="providerBranch.delivery.pickup"
                                checked={branch.delivery[0].isActive}
                                {...form.getFieldProps(`providerBranch[${index}].delivery[0].isActive`)}
                            />
                            <Checkbox
                                label="providerBranch.delivery.courier"
                                checked={branch.delivery[1].isActive}
                                {...form.getFieldProps(`providerBranch[${index}].delivery[1].isActive`)}
                            />
                        </Accordion>
                        <Accordion title="providerBranch.service.title" open>
                            <Checkbox
                                label="providerBranch.service.tireFitting"
                                checked={branch.service[0].isActive}
                                {...form.getFieldProps(`providerBranch[${index}].service[0].isActive`)}
                            />
                            <Checkbox
                                label="providerBranch.service.autoService"
                                checked={branch.service[1].isActive}
                                {...form.getFieldProps(`providerBranch[${index}].service[1].isActive`)}
                            />
                            <Checkbox
                                label="providerBranch.service.partSelection"
                                checked={branch.service[2].isActive}
                                {...form.getFieldProps(`providerBranch[${index}].service[2].isActive`)}
                            />
                        </Accordion>
                        <Accordion title="providerBranch.clientType.title" open>
                            <Checkbox
                                label="providerBranch.clientType.legal"
                                checked={branch.clientType[0].isActive}
                                {...form.getFieldProps(`providerBranch[${index}].clientType[0].isActive`)}
                            />
                            <Checkbox
                                label="providerBranch.clientType.individual"
                                checked={branch.clientType[1].isActive}
                                {...form.getFieldProps(`providerBranch[${index}].clientType[1].isActive`)}
                            />
                        </Accordion>
                    </div>

                    <div className={s.imgGroup}>
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
                        {/*@ts-ignore*/}
                        <span onClick={() => rest.push({ ...providerValues?.providerBranch[0] })}>
                            <Icon name="add_circle" size={18} />
                            {t('dashboard:add_branch')}
                        </span>

                        <span onClick={() => rest.remove(index)}>
                            <Icon name="delete" size={18} />
                            {t('dashboard:delete_branch')}
                        </span>
                    </div>
                </div>
            );
        })
    ) : (
        <div className={s.formGroup}>
            <div className={s.actionButtons}>
                {/*@ts-ignore*/}
                <span onClick={() => rest.push({ ...providerValues.providerBranch[0] })}>
                    <Icon name="add_circle" size={18} />
                    {t('dashboard:add_branch')}
                </span>
            </div>
        </div>
    );
};
