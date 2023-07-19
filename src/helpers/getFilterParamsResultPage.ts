export const getFilterParamsResultPage = (
    payment: string,
    delivery: string,
    service: string,
    client: string,
    shipment: string,
    updates: string,
    isOrigin: string,
    price: string = 'asc',
    availability: string
) => {
    const formatQuery = (param: string, val: string) => {
        return val ? `&${param}=${val}` : '';
    };

    return `${formatQuery('payment', payment)}${formatQuery('delivery', delivery)}${formatQuery(
        'service',
        service
    )}${formatQuery('clientType', client)}${formatQuery('shipment', shipment)}${formatQuery(
        'updates',
        updates
    )}${formatQuery('isOrigin', isOrigin)}${formatQuery('price', price)}${formatQuery('availability', availability)}`;
};
