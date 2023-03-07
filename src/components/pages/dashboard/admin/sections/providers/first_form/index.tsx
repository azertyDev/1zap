import { FC } from 'react';
import type { ProviderBranch, IProviderForm } from '../IProviderForm';
import * as Yup from 'yup';
import {
    FieldArrayRenderProps,
    Form,
    FormikHelpers,
    FormikProvider,
    FormikValues,
    useFormik,
    FieldArray,
} from 'formik';
import { StandartInput } from 'src/components/ui/input/standart_input';
import s from '../index.module.scss';
import { Icon } from 'src/components/ui/icon';
import { Map, Overlay, ZoomControl } from 'pigeon-maps';

import { osm } from 'pigeon-maps/providers';
import { MapPoint } from 'src/components/ui/map_point';
import { SelectField } from 'src/components/ui/select';

const initialValues = {
    providerBranch: [
        {
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
            ],
            images: [
                {
                    url: '',
                },
            ],
        },
    ],
};

export const FirstForm: FC = () => {
    const validationSchema = Yup.object().shape({});

    const onSubmit = async (values: FormikValues, {}: FormikHelpers<typeof initialValues>) => {
        alert(JSON.stringify(values, null, 2));
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
        // validationSchema,
    });

    return (
        <FormikProvider value={formik}>
            <div className={s.formGroup}>
                <FieldArray name="providerBranch" render={DynamicForm} />
            </div>
        </FormikProvider>
    );
};

const DynamicForm = (props: FieldArrayRenderProps) => {
    const { form, ...rest } = props;

    return (
        form.values.providerBranch.length > 0 &&
        form.values.providerBranch.map((branch: ProviderBranch, index: number) => {
            return (
                <Form key={index}>
                    <div className={s.formGroup}>
                        <div className={s.row}>
                            <div className={s.block}>
                                <StandartInput name={`providerBranch[${index}].phisicalAddress`} />
                                <StandartInput name={`providerBranch[${index}].branchName`} iconname="edit" />
                                <StandartInput name={`providerBranch[${index}].managerName`} />
                                <StandartInput name={`providerBranch[${index}].phone`} isPhone />
                            </div>

                            <div className={s.block}>
                                <Map
                                    defaultCenter={[41.31300484525912, 69.27182341706133]}
                                    defaultZoom={17}
                                    metaWheelZoom
                                    boxClassname={s.map}
                                >
                                    <Overlay
                                        anchor={[41.31300484525912, 69.27182341706133] as [number, number]}
                                        offset={[30, 30]}
                                    >
                                        <MapPoint val={1} />
                                    </Overlay>

                                    <ZoomControl />
                                </Map>
                                <StandartInput name={`providerBranch[${index}].landmark`} />
                            </div>
                        </div>
                        <StandartInput name={`providerBranch[${index}].location`} />
                        <StandartInput name={`providerBranch[${index}].branchType`} />
                        {/* <SelectField/> */}
                        <StandartInput name={`providerBranch[${index}].city`} />
                        <StandartInput name={`providerBranch[${index}].workingSchedule`} />
                        <StandartInput name={`providerBranch[${index}].weekendSchedule`} />
                        <StandartInput name={`providerBranch[${index}].weekend`} />
                        <StandartInput name={`providerBranch[${index}].breakTime`} />

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
                                <Icon name="person" size={18} />
                                Удалить филиал
                            </span>
                        </div>
                    </div>
                </Form>
            );
        })
    );
};
