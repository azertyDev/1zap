import dayjs from 'dayjs';
import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Table } from 'src/components/ui/dashboard/table';
import { Button } from 'src/components/ui/button';
import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import s from './index.module.scss';

export const PromoPage: FC = () => {
    const { push } = useRouter();

    const cols = [
        {
            Header: 'Дата',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YYYY'),
            disableFilters: true,
        },
        {
            Header: 'Поставщик',
            accessor: 'company',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Тип промо',
            accessor: 'type',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Содержание',
            accessor: 'description',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Действия',
            disableFilters: true,
            disableSortBy: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock cell={cell}>
                        <Link
                            href={{
                                pathname: '#',
                            }}
                        >
                            Открыть
                        </Link>
                    </ActionsBlock>
                );
            },
        },
    ];

    const data = [
        {
            id: 1,
            company: 'Hyundai auto asia',
            type: 'На прайс-лист',
            description: 'Обязательно получите подтверждение резерва на 1zap или по звонку',
            createdAt: '2023-03-13T11:34:48.981279Z',
        },
        {
            id: 2,
            company: 'KIA auto service',
            type: 'На филиал',
            description: 'Обязательно получите подтверждение резерва на 1zap или по звонку',
            createdAt: '2023-03-10T11:34:48.981279Z',
        },
    ];

    const promoItems = [
        {
            id: 1,
            title: 'Промо-текст на все позиции филиала',
            desc: 'Промо-текст, располагается в правой части карточки товарной позиции сроком на 30 календарных дней , на все загруженные прайс-листы.',
            price: '500 монет',
            url: '/branches',
        },
        {
            id: 2,
            title: 'Промо-текст на все позиции прайс-листа',
            desc: 'Промо-текст, располагается в левой части карточки товарной позиции сроком на 30 календарных дней , на выбранный прайс-лист.',
            price: 'От 20 монет',
            url: '/adverts',
        },
        {
            id: 3,
            title: 'Промо-текст на выборочные позиции ',
            desc: 'Промо-текст, располагается в левой части карточки товарной позиции сроком на 30 календарных дней , на выбранные позиции из прайс-листа.',
            price: 'От 5 монет',
            url: '#',
        },
    ];

    return (
        <div className={s.wrapper}>
            <h4>Размещение промо материала</h4>
            <div className={s.items}>
                {promoItems.map((item) => {
                    return (
                        <div key={item.id} className={s.item}>
                            <p>{item.title}</p>
                            <span>{item.desc}</span>
                            <div className={s.btns}>
                                <Button variant="disabled">{item.price}</Button>
                                <Button variant="primary" onClick={() => push(`/cabinet/promo/${item.url}`)}>
                                    Разместить
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* <Table columns={cols} data={data} title={<h4>Модерация промо материалов</h4>} /> */}
        </div>
    );
};
