import { FC } from 'react';

export const Icon: FC<{
    size: number;
    name: string;
    style?: string;
    color?: string;
}> = ({ size, name, style = '', color = '#9a9ea7' }) => {
    return (
        <i
            className={`material-icons mi material-symbols-outlined ${
                style ?? ''
            }`}
            style={{
                fontSize: `${size}px`,
                color: color,
            }}
        >
            {name}
        </i>
    );
};
