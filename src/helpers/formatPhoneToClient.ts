export const formatPhoneToClient = (val: string) => {
    return `+998 ${val.slice(4, 6)} ${val.slice(6, 9)} ${val.slice(9, 11)} ${val.slice(11)}`;
};
