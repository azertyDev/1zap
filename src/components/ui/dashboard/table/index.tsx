import { FC } from 'react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import s from './index.module.scss';

interface TableProps {
    data: any;
    columns: any;
}

// const columnHelper = createColumnHelper<IApplication>();

// const applicationColumns = [
//     columnHelper.accessor('providerName', {
//         cell: (info) => info.getValue(),
//         header: () => <span>ФИО</span>,
//     }),
//     columnHelper.accessor((row) => row.providerName, {
//         id: 'lastName',
//         cell: (info) => <i>{info.getValue()}</i>,
//         header: () => <span>Организация</span>,
//     }),
//     columnHelper.accessor('phone', {
//         header: () => 'Контактный телефон',
//         cell: (info) => info.renderValue(),
//     }),
//     columnHelper.accessor('id', {
//         header: (row) => <span>ID</span>,
//     }),
//     columnHelper.accessor('createdAt', {
//         header: 'Дата',
//         cell: (info) => <i>{dayjs(info.row.getValue('createdAt')).format('DD/MM/YYYY')}</i>,
//     }),
// ];

// const applicationColumns = [
//     columnHelper.accessor('providerName', {
//         cell: (info) => info.getValue(),
//         header: () => <span>ФИО</span>,
//     }),
//     columnHelper.accessor((row) => row.providerName, {
//         id: 'lastName',
//         cell: (info) => <i>{info.getValue()}</i>,
//         header: () => <span>Организация</span>,
//     }),
//     columnHelper.accessor('phone', {
//         header: () => 'Контактный телефон',
//         cell: (info) => info.renderValue(),
//     }),
//     columnHelper.accessor('id', {
//         header: (row) => <span>ID</span>,
//     }),
//     columnHelper.accessor('createdAt', {
//         header: 'Дата',
//         cell: (info) => <i>{dayjs(info.row.getValue('createdAt')).format('DD/MM/YYYY')}</i>,
//     }),
// ];

export const Table: FC<TableProps> = ({ data, columns }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className={s.root} data-id="table-root">
            <table>
                <thead>
                    {table.getHeaderGroups().length !== 0 &&
                        table?.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                </thead>
                <tbody>
                    {table?.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table?.getFooterGroups().length &&
                        table?.getFooterGroups().map((footerGroup) => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.footer, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                </tfoot>
            </table>
        </div>
    );
};
