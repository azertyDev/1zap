import React, { FC } from 'react';

export const Layout: FC<{ children: React.ReactNode }> = ({
    children,
}): JSX.Element => {
    return <div>{children}</div>;
};
