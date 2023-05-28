import { FC, ReactNode, useMemo } from 'react';
import { useTable, useSortBy, useFilters, usePagination, useResizeColumns } from 'react-table';
import { Icon } from 'components/ui/icon';
import { ColumnFilter } from './columnFilter';
import s from './index.module.scss';

interface TableProps {
    data: any;
    columns: any;
    title?: ReactNode;
}

export const Table: FC<TableProps> = ({ data, columns, title }) => {
    const defaultColumn = useMemo(
        () => ({
            Filter: ColumnFilter,
            minWidth: 30,
            width: 150,
            maxWidth: 400,
        }),
        []
    );

    const { rows, prepareRow, headerGroups, getTableProps, getTableBodyProps } = useTable(
        {
            data: useMemo(() => data, [data]),
            columns: useMemo(() => columns, [columns]),
            defaultColumn,
        },
        useFilters,
        useSortBy
    );

    console.log();

    return (
        <div className={s.root} data-id="table-root">
            {title && title}
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => {
                                return (
                                    <th
                                        {...column.getHeaderProps(
                                            column.getSortByToggleProps({
                                                style: {
                                                    width: column.width,
                                                    minWidth: column.minWidth,
                                                    maxWidth: column.maxWidth,
                                                },
                                            })
                                        )}
                                        key={index}
                                    >
                                        <div>
                                            {column.render('Header')}
                                            {column.canSort ? <Icon name="unfold_more" size={16} /> : null}
                                            {/* {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''} */}
                                            <div>{column.canFilter ? column?.render('Filter') : null}</div>
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {rows.map((row, index) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} key={index}>
                                {row.cells.map((cell, index) => {
                                    return (
                                        <td
                                            {...cell.getCellProps({
                                                style: {
                                                    width: cell.column.width,
                                                    minWidth: cell.column.minWidth,
                                                    maxWidth: cell.column.maxWidth,
                                                },
                                            })}
                                            key={index}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
