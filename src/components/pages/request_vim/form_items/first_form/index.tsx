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
import {SelectField} from "components/ui/select";


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
                    description: "",
                    brand: "",
                    model: "",
                    image: null
                }}
                onSubmit={(values, {setSubmitting}) => {
                    fun(true);
                    console.log(values)
                }}
            >
                {({handleSubmit, setFieldValue, values}) => (
                    <form onSubmit={handleSubmit}>
                        <div className={s.first_form}>
                            <div>
                                <InputWrapper>
                                    <FloatingInput name={'vinNumber'}/>
                                </InputWrapper>
                                <InputWrapper>
                                    <Field component={SelectField} name="brand" label={t("filter:brand")}
                                           options={[{value: "FERRARY", label: "FERRARY"}, {
                                               value: "BMW",
                                               label: "BMW"
                                           }]}/>
                                </InputWrapper>

                                <InputWrapper>
                                    <Field component={SelectField} name="model" label={t("filter:model")}
                                           options={[{value: "FERRARY", label: "FERRARY"}, {
                                               value: "BMW",
                                               label: "BMW"
                                           }]}/>
                                </InputWrapper>

                                <div className={s.inputs_wr}>
                                    <InputWrapper>
                                        <FloatingInput name={'yearIssue'}/>
                                    </InputWrapper>
                                    <InputWrapper>
                                        <FloatingInput name={'modification'}/>
                                    </InputWrapper>
                                </div>
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

                                {
                                    !values.image ?
                                        <>
                                            <label htmlFor={"file"} className={s.file_label}>
                                                <Icon size={20} name={"backup"} color={"#fff"}/>
                                                {t("common:downloadPhoto")}
                                            </label>
                                            <input onChange={(ev) => setFieldValue("image", ev.target.files)}
                                                   id={"file"}
                                                   accept={"image/*"}
                                                   type={"file"}
                                                   className={s.file_input}/>
                                        </> :
                                        <Button variant={"primary"} type={"button"} onClick={() =>setFieldValue("image", null)}>
                                            {t("common:deletePhoto")}
                                        </Button>
                                }

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
