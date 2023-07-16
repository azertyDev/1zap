import { FC, ReactNode, useMemo } from 'react';
import { useTable, useSortBy, useFilters } from 'react-table';
import { Icon } from 'components/ui/icon';
import { ColumnFilter } from './columnFilter';
import s from './index.module.scss';

interface TableProps {
    data: any;
    columns: any;
    title?: ReactNode;
    isSecondType?: boolean;
    globalSort?: boolean;
    handleSort?: (type: string, by: string, typeAnother?: string) => () => void;
    enableSort?: boolean;
}

export const Table: FC<TableProps> = ({ data, columns, title, isSecondType, globalSort, enableSort, handleSort }) => {
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
            // @ts-ignore
            defaultColumn,
        },
        useFilters,
        useSortBy
    );

    return (
        <div className={`${s.root} ${isSecondType ? s.second : ''}`} data-id="table-root">
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
                                            <div>{column.canFilter ? column?.render('Filter') : null}</div>
                                            {/*@ts-ignore*/}
                                            {column.showSort && enableSort && (
                                                <div className={s.sort_arr_wr}>
                                                    {/*@ts-ignore*/}
                                                    <div onClick={handleSort(column.id, 'asc', column.typeProperty)}>
                                                        <Icon name={'expand_less'} size={16} color={'#9A9EA7'} />
                                                    </div>
                                                    {/*@ts-ignore*/}
                                                    <div onClick={handleSort(column.id, 'desc', column.typeProperty)}>
                                                        <Icon name={'expand_more'} size={16} color={'#9A9EA7'} />
                                                    </div>
                                                </div>
                                            )}
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
