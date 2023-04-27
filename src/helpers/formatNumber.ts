export const formatNumber = (val: number) => {
    const formatter = new Intl.NumberFormat('ru').format(val);
    return formatter;
};
