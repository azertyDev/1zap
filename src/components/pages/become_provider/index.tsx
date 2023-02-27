import s from './index.module.scss';

import React, {FC, useState} from 'react';
import Link from 'next/link';

import {useTranslation} from 'next-i18next';
import {Field, Formik} from "formik";
import {becomeProviderValidation} from "src/validation/beacome_provider";
import {axiosInstance} from "src/utils/axios";
import {becomeProviderValues} from "src/constants/formik_values";

import {Logo} from 'components/ui/logo';
import {Button} from "components/ui/button";
import {InputWrapper} from "components/ui/input/input_wrapper";
import {FloatingInput} from "components/ui/input/float_input";
import {SelectField} from "components/ui/select";
import {Completed} from "components/ui/completed";
import {Icon} from "components/ui/icon";


export const BecomeProviderComp: FC = (): JSX.Element => {
    const {t} = useTranslation();
    const [cancleBtn, setCancelBtn] = useState(true);
    const [done, setDone] = useState(false);

    return (
        <div className={s.wrapper}>
            <header className={s.header}>
                <Link href={'/'}>
                    <Logo/>
                </Link>
                {cancleBtn && (
                    <Link href={"/"}>
                        <Button variant={"disabled"}>{t('common:cancel')}</Button>
                    </Link>
                )}
            </header>

            {!done && <div>
                <h2 className={s.title}>{t('footer:becomeSupplier')}</h2>
                <Formik
                    initialValues={becomeProviderValues}
                    validationSchema={becomeProviderValidation}
                    onSubmit={async (values, {setSubmitting}) => {
                        const val = {
                            phone: values.phone.slice(1).replaceAll(" ", ""),
                            service: values.service,
                            city: values.city,
                            providerName: values.username,
                            providerSurname: values.surname,
                            providerPatronymic: values.lastname,
                        }
                        try {
                            // const {data} = await axiosInstance.post("/app", JSON.stringify(val));
                            setCancelBtn(false);
                            setDone(true);
                        } catch (err) {
                            console.log(err)
                        }
                    }}
                >
                    {({handleSubmit, setFieldValue}) => (
                        <form onSubmit={handleSubmit} className={s.form}>
                            <InputWrapper>
                                <FloatingInput name={'username'}/>
                            </InputWrapper>
                            <InputWrapper>
                                <FloatingInput name={'surname'}/>
                            </InputWrapper>
                            <InputWrapper>
                                <FloatingInput name={'lastname'}/>
                            </InputWrapper>
                            <InputWrapper>
                                <FloatingInput name={'phone'} isPhone/>
                            </InputWrapper>

                            <div className={s.select_wr}>

                                <Field component={SelectField} name="service" label={t("common:autoService")}
                                       options={[
                                           {value: "tireFitting", label: t("select:tireFitting")},
                                           {value: "autoService", label: t("select:autoService")},
                                           {value: "partSelection", label: t("select:partSelection")}
                                       ]}/>

                                <Field component={SelectField} name="city" label={t("common:city")}
                                       options={[
                                           {value: "tashkent", label: t("select:tashkent")},
                                           {value: "bukhara", label: t("select:bukhara")},
                                           {value: "samarkand", label: t("select:samarkand")},
                                           {value: "andijan", label: t("select:andijan")},
                                           {value: "namangan", label: t("select:namangan")},
                                       ]}/>

                            </div>
                            <Button variant={"primary"} type={"submit"}>
                                {t('common:next')}
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>}

            {done && (
                <div className={s.second_form_wr}>
                    <Completed
                        title={'requestSend'}
                        img={<Icon size={28} name={'done'}/>}
                    >
                        <p>{t('common:weWillConnect')}</p>
                    </Completed>
                    <Link href={'/'}>
                        <Button variant={"primary"}>
                            {t('common:returnHone')}
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};
