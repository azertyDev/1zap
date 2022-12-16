import React from 'react';

export interface FooterItemInt {
    title: string;
    links: { id: number; link: string; text: string }[];
    children?: React.ReactNode;
}
