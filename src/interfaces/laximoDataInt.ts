export interface listCategoriesInt {
    $: { link: string; name: string; quickgroupid: string };
    row: {
        $: { link: string; name: string; quickgroupid: string };
        row: {
            $: { link: string; name: string; quickgroupid: string };
        }[];
    }[];
}

export interface listCategoriesFormedInt {
    titles: string[];
    filteredRows: [{ link: string; name: string; quickgroupid: string }[]][];
}

export interface unitDetailInfoInt {
    code: string;
    imageurl: string;
    largeimageurl: string;
    name: string;
    ssd: string;
    unitid: string;
}
