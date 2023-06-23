import { FC, useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import s from './index.module.scss';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { InputWrapper } from 'components/ui/input/input_wrapper';
import { FloatingInput } from 'components/ui/input/float_input';
import { Button } from 'components/ui/button';
import { formikValues } from 'src/constants/formik_values';
import { client_validation } from 'src/validation/client_validation';
import { centerApi } from 'src/utils/api';
import { toast } from 'react-hot-toast';
import { Switch } from 'components/ui/switch';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ISubTopicCreate } from 'types';

const JoditEditor = dynamic(() => import('components/ui/rich_text/RichText'), {
    ssr: false,
});

export const CenterForm: FC<{ query: { idC: string; idE: string } }> = ({ query }) => {
    const { t } = useTranslation();
    const { push } = useRouter();

    const [dataTopic, setDataTopic] = useState<ISubTopicCreate | null>(null);

    const formik = useFormik({
        initialValues: dataTopic
            ? {
                  titleRu: dataTopic.titleRu,
                  titleUz: dataTopic.titleUz,
                  textRu: dataTopic.textRu,
                  textUz: dataTopic.textUz,
                  isOften: dataTopic.isOften,
              }
            : formikValues.sub_theme,
        validationSchema: client_validation.sub_theme,
        enableReinitialize: true,
        onSubmit: async (values) => {
            if (query.idC) {
                centerApi
                    .createSubTopic({ ...values, topicId: +query.idC })
                    .then((response) => {
                        push(`/dashboard/center/category?id=${query.idC}`);
                    })
                    .catch(({ response }) => {
                        toast.error(t('helpers:error_sending'));
                    });
            }
            if (query.idE) {
                centerApi
                    .editSubTopic(query.idE, values)
                    .then((response) => {
                        push(`/dashboard/center/category?id=${dataTopic?.topicId}`);
                    })
                    .catch(({ response }) => {
                        toast.error(t('helpers:error_sending'));
                    });
            }
        },
    });

    useEffect(() => {
        if (query.idE) {
            (async () => {
                centerApi
                    .getSubTopic(query.idE)
                    .then((response) => {
                        setDataTopic(response);
                    })
                    .catch(({ response }) => {
                        toast.error(t('helpers:error_sending'));
                    });
            })();
        }
    }, []);

    const handleRichText = useCallback(
        (type: 'textRu' | 'textUz') => {
            return (ev: string) => (formik.values[type] = ev);
        },
        [formik.values]
    );

    const deleteSubTopic = useCallback(async () => {
        centerApi
            .deleteSubtopic(query.idE)
            .then((response) => {
                push(`/dashboard/center/category?id=${dataTopic?.topicId}`);
            })
            .catch(({ response }) => {
                toast.error(t('helpers:error_sending'));
            });
    }, [dataTopic]);

    return (
        <div>
            <div className={s.form_top_wr}>
                <h4 className={s.form_top_title}>{query.idE ? 'Редактирование под темы' : 'Создание под темы'}</h4>

                {query.idE && (
                    <button className={s.form_top_delete} onDoubleClick={deleteSubTopic}>
                        Удалить под тему
                    </button>
                )}
            </div>

            <div className={s.line}></div>

            <div>
                <FormikProvider value={formik}>
                    <Form>
                        <h5 className={s.sub_title}>Название под темы</h5>
                        <InputWrapper>
                            <FloatingInput {...formik.getFieldProps('titleRu')} />
                        </InputWrapper>
                        <InputWrapper>
                            <FloatingInput {...formik.getFieldProps('titleUz')} />
                        </InputWrapper>

                        <div className={s.faq_wr}>
                            <h5 className={s.sub_title}>Часто задаваемый вопрос?</h5>
                            <Switch {...formik.getFieldProps('isOften')} />
                        </div>

                        <h5 className={s.sub_title}>Контент под темы</h5>
                        <div className={s.richtext_wr}>
                            <p className={s.richtext_title}>Контент на русском</p>
                            <JoditEditor val={formik.values.textRu} fun={handleRichText('textRu')} />
                        </div>
                        <div className={s.richtext_wr}>
                            <p className={s.richtext_title}> Контент на узбекском</p>
                            <JoditEditor val={formik.values.textUz} fun={handleRichText('textUz')} />
                        </div>

                        <Button variant={'primary'} type={'submit'}>
                            {query.idE ? 'Редактировать' : 'Создать'}
                        </Button>
                    </Form>
                </FormikProvider>
            </div>
        </div>
    );
};
