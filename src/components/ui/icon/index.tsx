import { FC } from 'react';

interface IconProps {
    size?: number;
    name: string;
    style?: string;
    color?: string;
}

export const Icon: FC<IconProps> = ({
    size = 18,
    name,
    style = '',
    color,
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
