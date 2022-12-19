import { FC } from 'react';

export const Icon: FC<{ size: string; name: string; style?: string }> = ({
    size,
    name,
    style,
}) => {
    return (
        <i
            className={`material-symbols-outlined mi ${style}`}
            style={{
                fontSize: `${size}px`,
            }}
        >
            {name}
        </i>
    );
};
