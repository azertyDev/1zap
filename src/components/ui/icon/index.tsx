import { FC } from 'react';

export const Icon: FC<{ size: number; name: string; style?: string }> = ({
    size,
    name,
    style = '',
}) => {
    return (
        <i
            className={`material-icons mi ${style ?? ''}`}
            style={{
                fontSize: `${size}px`,
            }}
        >
            {name}
        </i>
    );
};
