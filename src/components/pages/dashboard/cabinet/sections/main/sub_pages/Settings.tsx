import * as Yup from 'yup';
import { Field, Form, FormikHelpers, FormikProvider, FormikValues, useFormik } from 'formik';
import { Heading } from 'src/components/ui/dashboard/heading';
import { Button } from 'src/components/ui/button';
import { SelectField } from 'src/components/ui/select';
import { selectDefaultVal } from 'src/constants/ selectDefaultVal';
import { FloatingInput } from 'src/components/ui/input/float_input';
import s from '../index.module.scss';
import { BaseSwitch } from 'src/components/ui/switch/BaseSwitch';

export const Settings = (props: any) => {
    const { pageProps } = props;

    const initialValues = {
        phone: '',
        email: '',
        password: '',
    };

    const onSubmit = async (values: any, {}: FormikHelpers<typeof initialValues>) => {
        console.log(values);
    };

    const formik = useFormik({
        onSubmit,
        initialValues: initialValues,
        // validationSchema,
        enableReinitialize: true,
    });

    return (
        <div>
            <Heading title={pageProps.title} desc={pageProps.desc} />

            <FormikProvider value={formik}>
                <Form>
                    <div className={s.block}>
                        <div className={s.row}>
                            <div>
                                <p className={s.blockName}>Язык, email и уведомления</p>
                                <div className={`${s.block}`}>
                                    <Field
                                        component={SelectField}
                                        name="branchType"
                                        label="Язык персонального кабинета"
                                        options={selectDefaultVal}
                                    />
                                    <FloatingInput {...formik.getFieldProps('email')} iconname="edit" />
                                </div>
                            </div>

                            <div>
                                <p className={s.blockName}>Установить новый пароль</p>
                                <div className={`${s.block}`}>
                                    <FloatingInput {...formik.getFieldProps('password')} iconname="lock" />
                                    <FloatingInput {...formik.getFieldProps('password')} iconname="edit" />
                                </div>
                            </div>
                        </div>

                        <div className={s.row}>
                            <div>
                                <p className={s.blockName}>Уведомления</p>
                                <div className={`${s.block}`}>
                                    <div className={s.notification_block}>
                                        <span>Уведомление баланса</span>
                                        <div>
                                            <p>Получать уведомления о нулевом балансе</p>

                                            <BaseSwitch />
                                        </div>
                                    </div>
                                    <div className={s.notification_block}>
                                        <span>Уведомление обновления листинга</span>
                                        <div>
                                            <p className={s.disabled}>Уведомлять раз в день обновить листинг</p>

                                            <BaseSwitch disabled/>
                                        </div>
                                    </div>
                                    <div className={s.notification_block}>
                                        <span>Уведомления запросов</span>
                                        <div>
                                            <p>Получать уведомления о входящих запросов</p>

                                            <BaseSwitch checked/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={s.actionButtons}>
                            <Button variant="disabled" type="reset">
                                Отмена
                            </Button>
                            <Button
                                type="submit"
                                disabled={!(formik.dirty || formik.isValid || formik.isSubmitting)}
                                variant={!(formik.dirty || formik.isValid) ? 'disabled' : 'primary'}
                            >
                                Обновить
                            </Button>
                        </div>
                    </div>
                </Form>
            </FormikProvider>
        </div>
    );
};
