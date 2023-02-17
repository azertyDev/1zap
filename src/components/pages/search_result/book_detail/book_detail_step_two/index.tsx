import React, {FC, useState} from 'react';

import s from './index.module.scss';
import {Icon} from 'components/ui/icon';
import {useTranslation} from 'next-i18next';
import {Completed} from 'components/ui/completed';

import {Formik} from 'formik';
import {FloatingInput} from 'components/ui/input/float_input';
import {Button} from 'components/ui/button';
import {IconsWrapper} from 'components/ui/icons_wrapper';
import {bookValidation} from "src/validation/book";

export const BookDetailStepTwo: FC<{
    handleOrder: (val: number) => () => void;
    toggleBookDetail: (val: boolean) => () => void;
}> = ({toggleBookDetail, handleOrder}): JSX.Element => {
    const {t} = useTranslation();

    const [done, setDone] = useState(false);
    const [phoneVal, setPhoneVal] = useState('');

    return (
        <div className={s.inner}>
            <div className={s.header}>
                <p className={s.header_title}>{t('common:orderingDetail')}</p>

                <div onClick={toggleBookDetail(false)}>
                    <Icon size={19} name={'close'}/>
                </div>
            </div>

            <div className={`${s.header_res}`}>
                {!done && (
                    <IconsWrapper size={'medium'} onClick={handleOrder(1)}>
                        <Icon size={16} name={'chevron_left'}/>
                    </IconsWrapper>
                )}

                <p className={s.header_title}>{t('common:ordering')}</p>

                <IconsWrapper size={'medium'} onClick={toggleBookDetail(false)}>
                    <Icon size={16} name={'close'}/>
                </IconsWrapper>
            </div>
            <div className={s.book_wr}>
                <Completed
                    smallTitle
                    title={done ? 'thanks' : 'orderDetail'}
                    img={
                        <Icon
                            size={done ? 20 : 40}
                            name={done ? 'done' : 'email'}
                        />
                    }
                >
                    <p>
                        {done
                            ? t('common:phoneSms', {phone: phoneVal})
                            : t('common:smsSend')}
                    </p>
                </Completed>
                {!done && (
                    <div className={s.book_form}>
                        <Formik
                            initialValues={{
                                contactNumber: '',
                                surname: '',
                            }}
                            validationSchema={bookValidation}
                            onSubmit={(values, {setSubmitting}) => {
                                setDone(true);
                                setPhoneVal(values.contactNumber);
                                alert(JSON.stringify(values));
                            }}
                        >
                            {({handleSubmit, isSubmitting}) => (
                                <form
                                    onSubmit={handleSubmit}
                                    className={s.form}
                                >
                                    <div className={s.inputs_wr}>
                                        <FloatingInput name={'surname'}/>
                                        <FloatingInput name={'contactNumber'} isPhone/>
                                    </div>

                                    <Button
                                        // isSubmitting={isSubmitting}
                                        variant={"primary"}
                                    >
                                        {t('header:login')}
                                    </Button>
                                </form>
                            )}
                        </Formik>
                    </div>
                )}
                {done && (
                    <Button onClick={toggleBookDetail(false)} variant={"primary"}>
                        {t('common:continueSearch')}
                    </Button>
                )}
            </div>
        </div>
    );
};
