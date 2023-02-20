import React, {Dispatch, FC, SetStateAction, useCallback} from 'react';
import {useTranslation} from 'next-i18next';

import s from '../../index.module.scss';
import {Formik} from 'formik';
import {Field} from 'formik';
import {FloatingInput} from 'src/components/ui/input/float_input';

import {Button} from 'components/ui/button';
import {InputWrapper} from 'components/ui/input/input_wrapper';
import {SelectField} from "components/ui/select";


const options = [
    {value: 1, label: 'text'},
    {value: 2, label: 'text2'},
]


export const FirstFormVim: FC<{
    fun: Dispatch<SetStateAction<boolean>>;
}> = ({fun}): JSX.Element => {
    const {t} = useTranslation();

    return (
        <div className={s.first_form_wr}>
            <h2 className={s.title}>{t('footer:becomeSupplier')}</h2>
            <Formik
                initialValues={{
                    vimNumber: '',
                    brand: '',
                    lastname: '',
                    contactNumber: '',
                    autoService: '',
                    city: '',
                }}
                onSubmit={(values, {setSubmitting}) => {
                    // fun(true);
                    alert(JSON.stringify(values));
                }}
            >
                {({handleSubmit, setFieldValue}) => (
                    <form onSubmit={handleSubmit}>
                        <div className={s.first_form}>
                            <div>
                                <InputWrapper>
                                    <FloatingInput name={'vimNumber'}/>
                                </InputWrapper>

                                <div className={s.select_wr}>
                                    <Field component={SelectField} name="city" options={options}/>
                                </div>


                                <InputWrapper>
                                    <FloatingInput name={'year'}/>
                                </InputWrapper>
                                <InputWrapper>
                                    <FloatingInput name={'modification'}/>
                                </InputWrapper>
                            </div>

                            <div>
                                <FloatingInput name={'year'}/>
                            </div>
                        </div>


                        <Button
                            // isSubmitting={isSubmitting}
                            variant={"primary"}
                        >
                            {t('common:next')}
                        </Button>
                    </form>
                )}
            </Formik>
        </div>
    );
};
