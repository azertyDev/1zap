import { FC, ReactNode, useMemo } from 'react';
import { useTable, useSortBy, useFilters, usePagination } from 'react-table';
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
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        previousPage,
        nextPage,
        pageCount,
        page,
    } = useTable(
        {
            data: useMemo(() => data, [data]),
            columns: useMemo(() => columns, [columns]),
            defaultColumn,
        },

        useFilters,
        useSortBy,
        usePagination
    );

    return (
        <div className={s.root} data-id="table-root">
            {title && title}
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                            {headerGroup.headers.map((column, index) => {
                                return (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())} key={index}>
                                        <div>
                                            {column.canSort ? <Icon name="unfold_more" size={16} /> : null}
                                            {column.render('Header')}
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
                                        <td {...cell.getCellProps()} key={index}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <span>
                {pageCount}
            </span>
            <button className="border rounded p-1" onClick={previousPage}>
                {'<'}
            </button>
            <button className="border rounded p-1" onClick={nextPage}>
                {'>'}
            </button>
        </div>
    );
};
