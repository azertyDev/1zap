export const formatNumber = (val: number) => {
    return new Intl.NumberFormat('ru').format(parseInt(`${val}`));
};
