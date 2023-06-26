export const checkPhone = (phone: string) => {
    return (phone.length == 9 ? `+998${phone}` : phone).replaceAll(' ', '');
};
