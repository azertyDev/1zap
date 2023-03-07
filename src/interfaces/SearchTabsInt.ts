import React from 'react';

export interface SearchTabsInt {
    activeTab: number;
    handleTab: (val: number) => () => void;
    children: React.ReactNode;
    tabs: { id: number; text: string; link?: string }[];
    tabsRes: { id: number; text: string }[];
    searchRes?: boolean;
}
