import { MenuItem } from '@szhsin/react-menu';
import dayjs from 'dayjs';
import Link from 'next/link';
import { Column } from 'react-table';
import { useEffect, useState } from 'react';
import { useStore } from 'src/store/useStore';
import { Icon } from 'src/components/ui/icon';
import { Button } from 'src/components/ui/button';
import { Table } from 'src/components/ui/dashboard/table';
import { Heading } from 'src/components/ui/dashboard/heading';
import { ActionsBlock } from 'src/components/ui/dashboard/table/ActionsBlock';
import { BaseSwitch } from 'src/components/ui/switch/BaseSwitch';
import { useRouter } from 'next/router';

export const Branches = (props: any) => {
    const { pageProps } = props;
    const { providerBranches, fetchProviderBranches } = useStore();
    const { push, ...rest } = useRouter();
    // const [active, setActive] = useState(false);

    // const handleChange = () => {
    //     setActive(!active);
    // };

    useEffect(() => {
        fetchProviderBranches();
    }, [fetchProviderBranches]);

    const updateBranch = (id: number) => {
        console.log(rest);

        push({
            pathname: '/cabinet/main/editBranch',
            query: { id: id },
        });
    };

    const columnMenu = (data: any) => (
        <>
            <MenuItem onClick={() => updateBranch(data.id)}>
                <Icon name="edit" color="black" />
                Редактировать
            </MenuItem>
            <MenuItem>
                <Icon name="delete" color="black" />
                Удалить
            </MenuItem>
        </>
    );

    const branchesCols: Column<any>[] = [
        {
            Header: 'Дата',
            accessor: 'createdAt',
            Cell: ({ cell }: any) => dayjs(cell.value).format('DD/MM/YYYY') as any,
            disableFilters: true,
        },
        {
            Header: 'Название',
            accessor: 'branchName',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Прайс-листы',
            accessor: 'type',
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: 'Позиции',
            // accessor: 'branchName',
            disableFilters: true,
            disableSortBy: true,
        },
        {
            Header: 'Промо',
            disableSortBy: true,
            disableFilters: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock>
                        <Link
                            href={{
                                pathname: '#',
                            }}
                        >
                            Добавить
                        </Link>
                    </ActionsBlock>
                );
            },
        },
        // {
        //     Header: 'Информация',
        //     disableFilters: true,
        //     disableSortBy: true,
        //     accessor: (cell: any) => {
        //         return (
        //             <ActionsBlock>
        //                 <Link
        //                     href={{
        //                         pathname: '#',
        //                     }}
        //                 >
        //                     Изменить
        //                 </Link>
        //             </ActionsBlock>
        //         );
        //     },
        // },
        {
            Header: 'Включен',
            disableFilters: true,
            disableSortBy: true,
            accessor: (cell: any) => {
                return (
                    <ActionsBlock cell={cell} menu={columnMenu(cell)}>
                        <BaseSwitch
                        // checked={active}
                        // onChange={handleChange}
                        />
                    </ActionsBlock>
                );
            },
        },
    ];

    return (
        <>
            <Heading title={pageProps.title} desc={pageProps.desc} />

            {!!providerBranches && <Table columns={branchesCols} data={providerBranches} />}
        </>
    );
};
