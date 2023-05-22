import { FC, useCallback, useEffect, useState } from 'react';
import { Button } from 'components/ui/button';
import s from './index.module.scss';

import { formikValues } from 'src/constants/formik_values';
import { client_validation } from 'src/validation/client_validation';
import { centerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { InputWrapper } from 'components/ui/input/input_wrapper';
import { FloatingInput } from 'components/ui/input/float_input';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { ITopic } from 'types';
import Link from 'next/link';
import { useOpenCloseWithVal } from 'src/hooks/common/useOpenCloseWithVal';

export const CenterPage: FC = () => {
    const { openClose, handleOpenClose } = useOpenCloseWithVal();
    const [trigger, setTrigger] = useState(false);
    const { push, locale } = useRouter();
    const { t } = useTranslation();

    const [data, setData] = useState<ITopic[]>([]);

    const formik = useFormik({
        initialValues: formikValues.create_theme,
        validationSchema: client_validation.create_theme,
        onSubmit: async (values) => {
            // @ts-ignore
            const objData = { ...values, isProvider: values.isProvider === 'provider' };
            console.log(objData);
            centerApi
                .addTopic(objData as ITopic)
                .then((response) => {
                    handleOpenClose(false)();
                    formik.resetForm();
                })
                .catch(({ response }) => {
                    toast.error(t('helpers:error_sending'));
                });
        },
    });

    useEffect(() => {
        (async () => {
            await centerApi
                .getAllTopics()
                .then((res) => setData(res))
                .catch(() => toast.error(t('helpers:error_getting')));
        })();
    }, [openClose, trigger]);

    const handleTopicFormClose = () => {
        document.addEventListener('click', (ev: any) => {
            if (ev?.target?.id === 'topic_form_wr') {
                handleOpenClose(false)();
            }
        });
    };

    const handleDeleteTopic = useCallback((id: number) => {
        return async () =>
            await centerApi
                .deleteTopic(id)
                .then(() => setTrigger((prev) => !prev))
                .catch(() => toast.error('Ошибка при удаление темы'));
    }, []);

    return (
        <div>
            <Button variant={'primary'} onClick={handleOpenClose(true)}>
                Создать тему
            </Button>

            <div className={s.line}></div>
            <div
                id={'topic_form_wr'}
                className={`${s.topic_form_wr} ${openClose ? s.active : ''}`}
                onClick={handleTopicFormClose}
            >
                <div className={s.topic_form_inner}>
                    <FormikProvider value={formik}>
                        <Form>
                            <InputWrapper>
                                <FloatingInput {...formik.getFieldProps('titleRu')} />
                            </InputWrapper>
                            <InputWrapper>
                                <FloatingInput {...formik.getFieldProps('titleUz')} />
                            </InputWrapper>
                            <div className={s.side_wr}>
                                <p className={s.side_title}>Часть</p>
                                <div className={s.side_wr_inner}>
                                    <div className={s.side_input_wr}>
                                        <Field
                                            className={s.side_input}
                                            type="radio"
                                            name="isProvider"
                                            value="client"
                                            id={'client'}
                                        />
                                        <label className={s.side_input_label} htmlFor={'client'}>
                                            <span></span>
                                            <span>Клиент</span>
                                        </label>
                                    </div>
                                    <div className={s.side_input_wr}>
                                        <Field
                                            className={s.side_input}
                                            type="radio"
                                            name="isProvider"
                                            value="provider"
                                            id={'provider'}
                                        />
                                        <label className={s.side_input_label} htmlFor={'provider'}>
                                            <span></span>
                                            <span>Провайдер</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <Button variant={'primary'} type={'submit'} fullWidth>
                                Создать
                            </Button>
                        </Form>
                    </FormikProvider>
                </div>
            </div>
            <div className={s.themes_wr}>
                {data &&
                    data.map((item) => {
                        return (
                            <div className={s.theme} key={item.id}>
                                <p className={s.theme_title}>{locale === 'ru' ? item.titleRu : item.titleUz}</p>
                                <div>
                                    <Link href={`/dashboard/center/category?id=${item.id}`} className={s.edit}>
                                        Редактировать
                                    </Link>

                                    <button
                                        type={'button'}
                                        className={s.delete}
                                        onDoubleClick={handleDeleteTopic(item.id)}
                                    >
                                        Удалить
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};
