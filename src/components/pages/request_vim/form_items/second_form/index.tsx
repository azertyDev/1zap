import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {useTranslation} from 'next-i18next';
import {Title} from "components/ui/title";
import s from "./index.module.scss";
import {Field, Formik} from "formik";
import {InputWrapper} from "components/ui/input/input_wrapper";
import {FloatingInput} from "components/ui/input/float_input";
import {SelectField} from "components/ui/select";

import {Button} from "components/ui/button";


export const SecondFormVim: FC<{
    fun: Dispatch<SetStateAction<boolean>>;
}> = ({fun}): JSX.Element => {

    const {t} = useTranslation();
    const [isDone, setIsDone] = useState(false);

    return (
        <div className={s.sec_form}>
            <Title className={s.title} main>
                {t('common:contactsData')}
            </Title>

            <Formik
                initialValues={{
                    username: '',
                    surname: "",
                    contactNumber: "",
                    "email": ""
                }}
                onSubmit={(values, {setSubmitting}) => {
                    console.log(values)
                }}
            >
                {({handleSubmit, setFieldValue, values}) => (
                    <form onSubmit={handleSubmit}>

                        <InputWrapper>
                            <FloatingInput name={'username'}/>
                        </InputWrapper>
                        <InputWrapper>
                            <FloatingInput name={'surname'}/>
                        </InputWrapper>
                        <InputWrapper>
                            <FloatingInput name={'contactNumber'}/>
                        </InputWrapper>
                        <InputWrapper>
                            <FloatingInput name={'email'}/>
                        </InputWrapper>

                        <div className={s.selects_wr}>
                            <InputWrapper>
                                <Field component={SelectField} name="brand" label={t("filter:brand")}
                                       options={[{value: "FERRARY", label: "FERRARY"}, {
                                           value: "BMW",
                                           label: "BMW"
                                       }]}/>
                            </InputWrapper>

                            <InputWrapper>
                                <Field component={SelectField} name="city" label={t("common:city")}
                                       options={[{value: "FERRARY", label: "FERRARY"}, {
                                           value: "BMW",
                                           label: "BMW"
                                       }]}/>
                            </InputWrapper>
                        </div>

                        <div className={s.buttons_wr}>
                            <Button
                                // isSubmitting={isSubmitting}
                                variant={"disabled"}
                            >
                                {t('common:cancel')}
                            </Button>

                            <Button
                                // isSubmitting={isSubmitting}
                                variant={"primary"}
                                type={"submit"}
                            >
                                {t('common:next')}
                            </Button>
                        </div>

                    </form>
                )}
            </Formik>
        </div>
    );
};
