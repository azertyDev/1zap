import React from 'react';

export interface SearchTabsInt {
    activeTab: number;
    handleTab: (val: number) => () => void;
    children: React.ReactNode;
    tabs: { id: number; text: string; link?: string; altText?: string }[];
    searchRes?: boolean;
    responsiveDif?: boolean;
}
