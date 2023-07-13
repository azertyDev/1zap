export const formPriceListEdit = (val: any) => {
    const temp = {
        id: val.id,
        title: val.title,
        branchId: val.branchId,
        type: val.type,
        clientType: val.clientType,
        currencyType: val.currencyType,
        payment: val.payment,
        availability: val.availability,
    };

    return temp;
};
