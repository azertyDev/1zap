export const formatValuesToSend = {
    createVin(values: any) {
        const dataSend: ICreateVinOrder = {
            vinNumber: values.vinNumber,
            yearIssue: values.yearIssue,
            modification: values.modification,
            description: values.description,
            brand: values.brand,
            model: values.model,
            payment: values.payment,
            customer: {
                username: values.username,
                phone: values.phone.replaceAll(' ', ''),
                city: values.city,
            },
        };

        return { dataSend };
    },
};
