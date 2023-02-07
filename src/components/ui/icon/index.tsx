import { FC } from 'react';

interface IconProps {
    size: number;
    name: string;
    style?: string;
    color?: string;
}

export const Icon: FC<IconProps> = ({
    size,
    name,
    style = '',
    color = '#9a9ea7',
}) => {
    return (
        <i
            className={`material-icons mi material-symbols-outlined ${
                style ?? ''
            }`}
            style={{
                fontSize: `${size}px`,
                color: `${color}`,
            }}
        >
            {name}
        </i>
    );
};
