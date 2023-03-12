import type { Image, ProviderBranch } from '../IProviderForm';
import { FC, useState } from 'react';
import { FieldArrayRenderProps, Field, FieldArray } from 'formik';
import { StandartInput } from 'src/components/ui/input/standart_input';
import { Icon } from 'src/components/ui/icon';
import { Map, Marker } from 'pigeon-maps';
import { SelectField } from 'src/components/ui/select';
import { Accordion } from 'src/components/ui/accordion';
import { Checkbox } from 'src/components/ui/dashboard/checkbox';
import { FileUploader } from 'src/components/ui/fileUploader';
import { maptiler } from 'pigeon-maps/providers';
import { ZoomControl } from 'src/components/ui/map/map_controls/zoom';

import s from '../index.module.scss';

const maptilerProvider = maptiler('Qlx00jY8FseHxRsxC7Dn', 'dataviz-light');

export const DynamicForm: FC<any> = (props: FieldArrayRenderProps) => {
    const { form, ...rest } = props;
    const [coordinates, setCoordinates] = useState<[number, number]>();

    const handleMap = (
        {
            event,
            latLng,
            pixel,
        }: {
            event: MouseEvent;
            latLng: [number, number];
            pixel: [number, number];
        },
        field: string
    ) => {
        setCoordinates(latLng);
        form.setFieldValue(field, JSON.stringify(latLng));
    };

    return form?.values.providerBranch && form?.values.providerBranch.length > 0 ? (
        form?.values.providerBranch.map((branch: ProviderBranch, index: number) => {
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
                            />
                        </div>

                        <div className={s.block}>
                            <Map
                                provider={maptilerProvider}
                                dprs={[1, 2]}
                                defaultCenter={[41.31172327941058, 69.2818072781773]}
                                defaultZoom={15}
                                // metaWheelZoom
                                boxClassname={s.map}
                                onClick={(event) => handleMap(event, `providerBranch[${index}].location`)}
                            >
                                {coordinates ? (
                                    <Marker anchor={coordinates}>
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
                                options={[
                                    { value: '0', label: 'Автодилер' },
                                    { value: '1', label: 'Перекупщик' },
                                ]}
                            />
                            <Field
                                component={SelectField}
                                name={`providerBranch[${index}].city`}
                                label="dashboard:providerBranch.city"
                                options={[
                                    { value: '0', label: 'Автодилер' },
                                    { value: '1', label: 'Перекупщик' },
                                ]}
                            />
                        </div>

                        <div className={`${s.row} ${s.gap_30}`}>
                            <div className={s.block}>
                                <div className={`${s.row} ${s.gap_30}`}>
                                    <Field
                                        component={SelectField}
                                        name={`providerBranch[${index}].workingSchedule`}
                                        label="dashboard:providerBranch.workingSchedule"
                                        options={[
                                            { value: '0', label: 'Автодилер' },
                                            { value: '1', label: 'Перекупщик' },
                                        ]}
                                    />
                                    <Field
                                        component={SelectField}
                                        name={`providerBranch[${index}].weekendSchedule`}
                                        label="dashboard:providerBranch.weekendSchedule"
                                        options={[
                                            { value: '0', label: 'Автодилер' },
                                            { value: '1', label: 'Перекупщик' },
                                        ]}
                                    />
                                </div>
                                <div className={`${s.row} ${s.gap_30}`}>
                                    <Field
                                        component={SelectField}
                                        name={`providerBranch[${index}].weekend`}
                                        label="dashboard:providerBranch.weekend"
                                        options={[
                                            { value: '0', label: 'Автодилер' },
                                            { value: '1', label: 'Перекупщик' },
                                        ]}
                                    />
                                    <Field
                                        component={SelectField}
                                        name={`providerBranch[${index}].breakTime`}
                                        label="dashboard:providerBranch.breakTime"
                                        options={[
                                            { value: '0', label: 'Автодилер' },
                                            { value: '1', label: 'Перекупщик' },
                                        ]}
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
                                    branch.images?.map((image: Image, i: number) => {
                                        return (
                                            <div key={index}>
                                                <FileUploader
                                                    preview={`${image.url}`}
                                                    setFieldValue={form.setFieldValue}
                                                    name={`providerBranch.[${index}].images[${i}].url`}
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
                    </div>

                    <div className={s.actionButtons}>
                        <span
                            onClick={() =>
                                rest.push({
                                    branchName: '',
                                    phisicalAddress: '',
                                    phone: '',
                                    managerName: '',
                                    landmark: '',
                                    location: '',
                                    branchType: '',
                                    city: '',
                                    workingSchedule: '',
                                    weekendSchedule: '',
                                    weekend: '',
                                    breakTime: '',
                                    payment: [
                                        {
                                            method: 'cash',
                                            isActive: false,
                                        },
                                        {
                                            method: 'card',
                                            isActive: false,
                                        },
                                        {
                                            method: 'transfer',
                                            isActive: false,
                                        },
                                    ],
                                    delivery: [
                                        {
                                            method: 'pickup',
                                            isActive: false,
                                        },
                                        {
                                            method: 'courier',
                                            isActive: false,
                                        },
                                    ],
                                    service: [
                                        {
                                            name: 'tireFitting',
                                            isActive: false,
                                        },
                                        {
                                            name: 'autoService',
                                            isActive: false,
                                        },
                                        {
                                            name: 'partSelection',
                                            isActive: false,
                                        },
                                    ],
                                    clientType: [
                                        {
                                            type: 'legal',
                                            isActive: false,
                                        },
                                        {
                                            type: 'individual',
                                            isActive: false,
                                        },
                                    ],
                                    images: [
                                        {
                                            url: '',
                                        },
                                    ],
                                })
                            }
                        >
                            <Icon name="add_circle" size={18} />
                            Дополнительный филиал
                        </span>

                        <span onClick={() => rest.remove(index)}>
                            <Icon name="delete" size={18} />
                            Удалить филиал
                        </span>
                    </div>
                </div>
            );
        })
    ) : (
        <div className={s.formGroup}>
            <div className={s.actionButtons}>
                <span
                    onClick={() =>
                        rest.push({
                            branchName: '',
                            phisicalAddress: '',
                            phone: '',
                            managerName: '',
                            landmark: '',
                            location: '',
                            branchType: '',
                            city: '',
                            workingSchedule: '',
                            weekendSchedule: '',
                            weekend: '',
                            breakTime: '',
                            payment: [
                                {
                                    method: 'cash',
                                    isActive: false,
                                },
                                {
                                    method: 'card',
                                    isActive: false,
                                },
                                {
                                    method: 'transfer',
                                    isActive: false,
                                },
                            ],
                            delivery: [
                                {
                                    method: 'pickup',
                                    isActive: false,
                                },
                                {
                                    method: 'courier',
                                    isActive: false,
                                },
                            ],
                            service: [
                                {
                                    name: 'tireFitting',
                                    isActive: false,
                                },
                                {
                                    name: 'autoService',
                                    isActive: false,
                                },
                                {
                                    name: 'partSelection',
                                    isActive: false,
                                },
                            ],
                            clientType: [
                                {
                                    type: 'legal',
                                    isActive: false,
                                },
                                {
                                    type: 'individual',
                                    isActive: false,
                                },
                            ],
                            images: [
                                {
                                    url: '',
                                },
                            ],
                        })
                    }
                >
                    <Icon name="add_circle" size={18} />
                    Добавить филиал
                </span>
            </div>
        </div>
    );
};
