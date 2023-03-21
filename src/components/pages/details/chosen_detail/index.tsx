import s from './index.module.scss';
import { Container } from 'components/ui/container';
import { Title } from 'components/ui/title';
import { IconsWrapper } from 'components/ui/icons_wrapper';
import { PageWrapper } from 'components/ui/page_wrapper';
import { Icon } from 'components/ui/icon';

import { FC } from 'react';
import Image from 'next/image';
import { TableRow } from 'components/ui/table/table_row';
import { TableElement } from 'components/ui/table/table_element';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { useChosenDetail } from 'src/hooks/laximoData/useChosenDetail';

export const ChosenDetail: FC<{
    dataAuto: string;
    dataDetailByUnit: string;
    dataGetUnitInfo: string;
}> = ({ dataAuto, dataDetailByUnit, dataGetUnitInfo }): JSX.Element => {
    const { t } = useTranslation();
    const { back } = useRouter();

    const { auto, detailByUnit, unitInfo } = useChosenDetail(dataAuto, dataDetailByUnit, dataGetUnitInfo);

    return (
        <PageWrapper>
            <Container>
                {auto && (
                    <Title main className={s.title}>
                        {auto.brand} {auto.name}
                    </Title>
                )}
                <div className={s.inner}>
                    <div>
                        <div className={s.link} onClick={back}>
                            <IconsWrapper size={'big'}>
                                <Icon size={22} name={'arrow_back'} />
                            </IconsWrapper>
                        </div>
                        <div className={s.img}>
                            {unitInfo && (
                                <Image
                                    src={unitInfo.largeimageurl?.replace('%size%', 'source')}
                                    fill
                                    alt={'detail'}
                                    quality={100}
                                />
                            )}
                        </div>
                    </div>
                    <div>
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
                            detailByUnit.map(({ $ }) => {
                                return (
                                    <div key={$.oem + $.codeonimage + $.name}>
                                        <TableRow className={s.table_row}>
                                            <TableElement className={'table_b'}>
                                                <h5>{$.codeonimage}</h5>
                                            </TableElement>
                                            <TableElement className={'table_b'}>
                                                <h5>{$.name}</h5>
                                                <p>{$.oem}</p>
                                            </TableElement>
                                            <TableElement className={'table_b'}>
                                                <button>{t('common:find')}</button>
                                            </TableElement>
                                        </TableRow>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </Container>
        </PageWrapper>
    );
};
