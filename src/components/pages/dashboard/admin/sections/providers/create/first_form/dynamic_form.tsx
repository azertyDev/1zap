import { FC, useEffect, useState } from 'react';
import { FieldArrayRenderProps, Field, FieldArray } from 'formik';
import { StandartInput } from 'src/components/ui/input/standart_input';
import { Icon } from 'src/components/ui/icon';
import { Map, Marker } from 'pigeon-maps';
import { SelectField } from 'src/components/ui/select';
import { Accordion as CustomAccordion } from 'src/components/ui/accordion';
import { Checkbox } from 'src/components/ui/dashboard/checkbox';
import { ImageUpload } from 'src/components/ui/upload/image';
import { maptiler } from 'pigeon-maps/providers';
import { ZoomControl } from 'src/components/ui/map/map_controls/zoom';
import { staticParamsApi } from 'src/utils/api';
import { transformSelectOptions } from 'src/helpers/transformSelectOptions';
import { IBranchData, IImage } from 'types';
import { useTranslation } from 'next-i18next';
import { providerValuesSecond } from './initialValues';
import s from '../index.module.scss';
import { ControlledAccordion, AccordionItem, useAccordionProvider } from '@szhsin/react-accordion';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');

export const DynamicForm: FC<any> = (props: FieldArrayRenderProps) => {
    const providerValue = useAccordionProvider({
        transition: true,
        transitionTimeout: 250,
    });

    const { toggle } = providerValue;

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

            const AccordionHeader = () => {
                return (
                    <div className={s.accordionHeader}>
                        <div className={s.title}>
                            <span>
                                {t('dashboard:branch')} {index + 1}
                            </span>
                            <p>{branch.branchName}</p>
                        </div>
                        <div>
                            <Icon name="edit" />
                        </div>
                    </div>
                );
            };

            return (
                <ControlledAccordion className={s.accordion} providerValue={providerValue} key={index}>
                    <AccordionItem header={AccordionHeader} initialEntered itemKey={`item-${index + 1}`}>
                        <div className={s.formGroup}>
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

                                    <div>
                                        <FieldArray
                                            name={`providerBranch.[${index}].phones`}
                                            render={(helperProps) => {
                                                return branch.phones && branch.phones.length ? (
                                                    branch.phones?.map((number, i) => {
                                                        return (
                                                            <div key={i}>
                                                                <StandartInput
                                                                    isPhone
                                                                    label="dashboard:providerBranch.phone"
                                                                    {...form.getFieldProps(
                                                                        `providerBranch[${index}].phones[${i}].number`
                                                                    )}
                                                                    setFieldValue={form.setFieldValue}
                                                                />

                                                                {branch.phones.length > 0 && (
                                                                    <div className={s.actionButtons}>
                                                                        <span
                                                                            onClick={() =>
                                                                                helperProps.push({ number: '' })
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
                                    <div style={{ height: '100%', maxHeight: '240px' }}>
                                        <Map
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
                                        {form.getFieldMeta(`providerBranch[${index}].location`).error && (
                                            <span className="error">
                                                {t(
                                                    `helpers:${
                                                        form.getFieldMeta(`providerBranch[${index}].location`).error
                                                    }`
                                                )}
                                            </span>
                                        )}
                                    </div>

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
                                                name={`providerBranch[${index}].workingDays`}
                                                label="dashboard:workingDays"
                                                options={
                                                    params ? transformSelectOptions(params.workingDays) : defaultOptions
                                                }
                                            />
                                            <Field
                                                component={SelectField}
                                                name={`providerBranch[${index}].workingSchedule`}
                                                label="dashboard:providerBranch.workingSchedule"
                                                options={params ? params.workingSchedule : defaultOptions}
                                            />
                                        </div>
                                        <div className={`${s.row} ${s.gap_30}`}>
                                            <Field
                                                component={SelectField}
                                                name={`providerBranch[${index}].weekendDays`}
                                                label="dashboard:weekendDays"
                                                options={
                                                    params ? transformSelectOptions(params.weekendDays) : defaultOptions
                                                }
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
                                                options={
                                                    params ? transformSelectOptions(params.weekend) : defaultOptions
                                                }
                                            />
                                            <Field
                                                component={SelectField}
                                                name={`providerBranch[${index}].breakTime`}
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
                                <CustomAccordion title="providerBranch.payment.title" open>
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
                                </CustomAccordion>
                                <CustomAccordion title="providerBranch.delivery.title" open>
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
                                </CustomAccordion>
                                <CustomAccordion title="providerBranch.service.title" open>
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
                                </CustomAccordion>
                                <CustomAccordion title="providerBranch.clientType.title" open>
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
                                </CustomAccordion>
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
                                                        {form.getFieldMeta(`providerBranch.[${index}].images[${i}].url`)
                                                            .error && (
                                                            <span className="error">
                                                                {t(
                                                                    `helpers:${
                                                                        form.getFieldMeta(
                                                                            `providerBranch.[${index}].images[${i}].url`
                                                                        ).error
                                                                    }`
                                                                )}
                                                            </span>
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

                                <span
                                    onClick={() => {
                                        toggle(`item-${index + 1}`);
                                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                        rest.push({ ...providerValuesSecond?.providerBranch[0] });
                                    }}
                                >
                                    <Icon name="add_circle" size={18} />
                                    {t('dashboard:add_branch')}
                                </span>

                                <span onClick={() => rest.remove(index)}>
                                    <Icon name="delete" size={18} />
                                    {t('dashboard:delete_branch')}
                                </span>
                            </div>
                        </div>
                    </AccordionItem>
                </ControlledAccordion>
            );
        })
    ) : (
        <div className={s.formGroup}>
            <div className={s.actionButtons}>
                {/*@ts-ignore*/}
                <span onClick={() => rest.push({ ...providerValuesSecond.providerBranch[0] })}>
                    <Icon name="add_circle" size={18} />
                    {t('dashboard:add_branch')}
                </span>
            </div>
        </div>
    );
};
