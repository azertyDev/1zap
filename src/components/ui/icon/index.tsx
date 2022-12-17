import { FC } from 'react';

export const Icon: FC<{ size: string; name: string; style: string }> = ({
    size,
    name,
    style = '#9A9EA7',
}) => {
    return <i className={`material-symbols-outlined mi ${size}`}>{name}</i>;
};
