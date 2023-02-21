import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import {useTranslation} from 'next-i18next';

import s from './index.module.scss';
import {FieldProps, Formik} from 'formik';
import {Field} from 'formik';
import {FloatingInput} from 'src/components/ui/input/float_input';

import {Button} from 'components/ui/button';
import {InputWrapper} from 'components/ui/input/input_wrapper';
import {Icon} from "components/ui/icon";
import {Title} from "components/ui/title";


export const FirstFormVim: FC<{
    fun: Dispatch<SetStateAction<boolean>>;
}> = ({fun}): JSX.Element => {
    const {t} = useTranslation();

    return (
        <div className={s.first_form_wr}>
            <Title className={s.title} main>
                {t('common:searchDetailVin')}
            </Title>

            <Formik
                initialValues={{
                    vinNumber: '',
                    yearIssue: "",
                    modification: "",
                    description: ""
                }}
                onSubmit={(values, {setSubmitting}) => {
                    // fun(true);
                    alert(JSON.stringify(values));
                }}
            >
                {({handleSubmit, values}) => (
                    <form onSubmit={handleSubmit}>
                        <div className={s.first_form}>
                            <div>
                                <InputWrapper>
                                    <FloatingInput name={'vinNumber'}/>
                                </InputWrapper>

                                <InputWrapper>
                                    <FloatingInput name={'yearIssue'}/>
                                </InputWrapper>
                                <InputWrapper>
                                    <FloatingInput name={'modification'}/>
                                </InputWrapper>

                            </div>

                            <div>
                                <Field name="description">
                                    {({
                                          field,
                                          meta
                                      }: FieldProps) => {
                                        return (
                                            <textarea
                                                className={s.textarea}
                                                placeholder={t("common:describeDetail") as string}
                                                {...field}
                                                {...meta}
                                            ></textarea>
                                        );
                                    }}
                                </Field>

                                <Button variant={"primary"} className={s.btn_upload}>
                                    <Icon size={20} name={"backup"} color={"#fff"}/>
                                    {t("common:downloadPhoto")}
                                </Button>
                            </div>
                        </div>

                        <Button
                            // isSubmitting={isSubmitting}
                            variant={"primary"}
                            type={"submit"}
                            className={s.submit_btn}
                        >
                            {t('common:next')}
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
