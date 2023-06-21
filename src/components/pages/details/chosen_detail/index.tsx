import s from './index.module.scss';
import { Container } from 'components/ui/container';
import { IconsWrapper } from 'components/ui/icons_wrapper';
import { PageWrapper } from 'components/ui/page_wrapper';
import { Icon } from 'components/ui/icon';

import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import { TableRow } from 'components/ui/table/table_row';
import { TableElement } from 'components/ui/table/table_element';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { useChosenDetail } from 'src/hooks/laximoData/useChosenDetail';

import { SelectField } from 'components/ui/select';

import { Field, Form, FormikProvider, useFormik } from 'formik';

export const ChosenDetail: FC<{
    dataAuto: string;
    dataDetailByUnit: string;
    dataGetUnitInfo: string;
}> = ({ dataAuto, dataDetailByUnit, dataGetUnitInfo }): JSX.Element => {
    const { t } = useTranslation();
    const { back } = useRouter();

    const { auto, detailByUnit, unitInfo } = useChosenDetail(dataAuto, dataDetailByUnit, dataGetUnitInfo);

    const formik = useFormik({
        initialValues: {
            codeimg: '',
        },
        onSubmit: async (values) => {},
    });

    useEffect(() => {
        if (window.innerWidth >= 1110) {
            document.querySelectorAll('.item_table_element').forEach((ev) => {
                // @ts-ignore
                if (ev.dataset.codeimg === formik.values.codeimg) {
                    window.scrollBy({
                        top: ev.getBoundingClientRect().y,
                        left: 0,
                        behavior: 'smooth',
                    });
                }
            });
        }
        if (innerWidth < 1110) {
            document.querySelectorAll('.item_table_element_res').forEach((ev) => {
                // @ts-ignore
                if (ev.dataset.codeimgres === formik.values.codeimg) {
                    window.scrollBy({
                        top: ev.getBoundingClientRect().y,
                        left: 0,
                        behavior: 'smooth',
                    });
                }
            });
        }
    }, [formik.values.codeimg]);

    return (
        <PageWrapper>
            <Container>
                <p className={s.sub_title}>{t('common:sparePartsCat')}</p>
                {auto && (
                    <h1 className={s.title}>
                        {auto.brand} {auto.name}
                    </h1>
                )}
                {unitInfo && (
                    <h5 className={s.table_title_res}>
                        {unitInfo.code} {unitInfo.name}
                    </h5>
                )}
                <div className={s.line}></div>
                <div className={s.inner}>
                    <div>
                        <div className={s.link_select_wr}>
                            <div className={s.link} onClick={back}>
                                <IconsWrapper size={'big'}>
                                    <Icon size={22} name={'arrow_back'} />
                                </IconsWrapper>
                            </div>

                            <FormikProvider value={formik}>
                                <Form>
                                    <Field
                                        component={SelectField}
                                        name="codeimg"
                                        label={t('common:selects.choose_img_id')}
                                        isSearchable={true}
                                        options={
                                            detailByUnit
                                                ? detailByUnit.map((item) => ({
                                                      value: item.$.codeonimage,
                                                      label: item.$.codeonimage,
                                                  }))
                                                : [{ value: '', label: '' }]
                                        }
                                    />
                                </Form>
                            </FormikProvider>
                        </div>

                        <div className={s.img}>
                            {unitInfo && (
                                <Image
                                    src={unitInfo.largeimageurl?.replace('%size%', 'source')}
                                    fill
                                    alt={'detail'}
                                    quality={100}
                                    sizes="600"
                                    priority
                                />
                            )}
                        </div>
                        <div className={s.line}></div>
                    </div>
                    <div className={s.table_des}>
                        {unitInfo && (
                            <h5 className={s.table_title}>
                                {unitInfo.code} {unitInfo.name}
                            </h5>
                        )}

                        <TableRow className={s.table_row}>
                            <TableElement className={'table_h'}>№</TableElement>
                            <TableElement className={'table_h'}>Запчасть</TableElement>
                            <TableElement className={'table_h'}></TableElement>
                        </TableRow>
                        {detailByUnit &&
                            detailByUnit.map((item, index) => {
                                return (
                                    <div
                                        key={item.$.oem + item.$.codeonimage + index}
                                        className={`item_table_element ${s.item_table_element} ${
                                            item.$.codeonimage === formik.values.codeimg ? s.active : ''
                                        }`}
                                        data-codeimg={item.$.codeonimage}
                                    >
                                        <TableRow className={s.table_row}>
                                            <TableElement className={'table_b'}>
                                                <h5>{item.$.codeonimage}</h5>
                                            </TableElement>
                                            <TableElement className={'table_b'}>
                                                <h5>{item.$.name}</h5>
                                                <p>{item.$.oem}</p>
                                            </TableElement>
                                            <TableElement className={'table_b'}>
                                                <a
                                                    href={`/search_result?oem=${item.$.oem}`}
                                                    target={'_blank'}
                                                    className={item.$.oem.length === 0 ? s.disable : ''}
                                                    rel="noreferrer"
                                                >
                                                    <button>{t('common:find')}</button>
                                                </a>
                                            </TableElement>
                                        </TableRow>
                                    </div>
                                );
                            })}
                    </div>
                    <div className={s.table_res_wr}>
                        {detailByUnit &&
                            detailByUnit.map((item, index) => {
                                return (
                                    <div
                                        className={`item_table_element_res ${s.table_res} ${
                                            item.$.codeonimage === formik.values.codeimg ? s.active : ''
                                        }`}
                                        data-codeimgres={item.$.codeonimage}
                                        key={item.$.oem + item.$.codeonimage + index}
                                    >
                                        <p className={s.table_res_title}>{item.$.name}</p>
                                        <div className={s.table_res_content}>
                                            <div className={s.table_res_content_oem}>
                                                <p className={s.table_res_code}>{item.$.codeonimage}</p>
                                                {item.$.oem.length > 0 && <div className={s.circle}></div>}
                                                <p className={s.table_res_oem}>{item.$.oem}</p>
                                            </div>

                                            <a
                                                href={`/search_result?oem=${item.$.oem}`}
                                                target={'_blank'}
                                                className={item.$.oem.length === 0 ? s.disable : ''}
                                                rel="noreferrer"
                                            >
                                                {t('common:find')}
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </Container>
        </PageWrapper>
    );
};
