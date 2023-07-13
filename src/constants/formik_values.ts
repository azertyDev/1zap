export const formikValues = {
    becomeProvider: {
        username: '',
        surname: '',
        companyName: '',
        phone: '',
        service: '',
        city: '',
    },
    vimRequest: {
        vinNumber: '',
        yearIssue: '',
        description: '',
        brand: '',
        model: '',
        username: '',
        phone: '',
        city: '',
        payment: '',
        image: '',
    },
    contact: {
        username: '',
        email: '',
        description: '',
    },
    create_theme: {
        titleRu: '',
        titleUz: '',
        isProvider: false,
    },
    sub_theme: {
        titleRu: '',
        titleUz: '',
        textRu: '',
        textUz: '',
        isOften: false,
    },
    price_list: {
        file: '',
        title: '',
        branchId: null,
        currencyType: '',
        clientType: '',
        type: '',
        availability: '',
        payment: [
            {
                method: 'cash',
                isActive: false,
            },
            {
                method: 'card',
                isActive: false,
            },
            {
                method: 'transfer',
                isActive: false,
            },
        ],
    },
};
