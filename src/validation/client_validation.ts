import * as yup from 'yup';
import * as Yup from 'yup';

export const client_validation = {
    becomeProvider: yup.object().shape({
        username: yup.string().trim().required(`required`),
        surname: yup.string().trim().required(`required`),
        companyName: yup.string().trim().required(`required`),
        city: yup.string().trim().required(`required`),
        service: yup.string().trim().required(`required`),
        phone: yup
            .string()
            .trim()
            .matches(/\+998 \d\d \d\d\d\d\d\d\d/, 'invalid_format')
            .required('required'),
    }),
    book: yup.object().shape({
        name: yup.string().trim().required(`required`),
        phone: yup
            .string()
            .trim()
            .matches(/\+998 \d\d \d\d\d\d\d\d\d/, 'invalid_format')
            .required('required'),
    }),
    login: yup.object().shape({
        email: yup.string().email('invalid_format').required('required'),
        password: yup.string().required('required'),
    }),
    loginForgot: yup.object().shape({
        email: yup.string().email('invalid_format').required('required'),
    }),
    search: yup.object().shape({
        searchVal: yup.string().trim().min(1, '').required(''),
    }),
    vimRequest: yup.object().shape({
        vinNumber: yup.string().required('required'),
        yearIssue: yup
            .string()
            .max(4, 'year_length')
            .matches(/\d\d\d\d/, 'invalid_format')
            .required('required'),
        brand: yup.string().required('required'),

        phone: yup
            .string()
            .trim()
            .matches(/\+998 \d\d \d\d\d\d\d\d\d/, 'invalid_format')
            .required('required'),
        username: yup.string().required('required'),
        city: yup.string().required('required'),
        payment: yup.string().required('required'),
        description: yup.string().required('required'),
    }),
    contact: yup.object().shape({
        username: yup.string().required('required'),
        email: yup.string().email('invalid_format').required('required'),
        description: yup.string().required('required'),
    }),
    create_theme: yup.object().shape({
        titleRu: yup.string().required('required'),
        titleUz: yup.string().required('required'),
    }),
    sub_theme: yup.object().shape({
        titleRu: yup.string().required('required'),
        titleUz: yup.string().required('required'),
        textRu: yup.string().required('required'),
        textUz: yup.string().required('required'),
    }),
    promo: Yup.object({
        descriptionRu: Yup.string().min(3, 'limit_less').max(80, 'limit_more').required('required'),
        descriptionUz: Yup.string().min(3, 'limit_less').max(80, 'limit_more').required('required'),
    }),
    wallet: Yup.object({
        file: Yup.mixed().required('required'),
        agreementNumber: Yup.string().required('required'),
    }),
    price_list_edit: Yup.object({
        file: Yup.mixed().required('required'),
    }),
    price_list: Yup.object({
        file: Yup.mixed().required('required'),
        title: yup.string().required('required'),
        currencyType: yup.string().required('required'),
        clientType: yup.string().required('required'),
        type: yup.string().required('required'),
        availability: yup.string().required('required'),
        branchId: yup.string().required('required'),
    }),
    rate: Yup.object({
        rate: yup.number().typeError('invalid_format').required('required'),
    }),
    create_provider: Yup.object().shape({
        legalAddress: Yup.string().min(2, 'limit_less').max(50, 'limit_more').required('required'),
        phone: yup
            .string()
            .trim()
            .matches(/\+998 \d\d \d\d\d\d\d\d\d/, 'invalid_format')
            .required('required'),
        fullName: Yup.string().min(2, 'limit_less').max(50, 'limit_more').required('required'),
        email: yup.string().email('invalid_format').required('required'),
        companyName: Yup.string().min(2, 'limit_less').max(50, 'limit_more').required('required'),
        inn: Yup.string().min(9, 'limit_less').max(9, 'limit_more').required('required'),
        coin: Yup.number().label('Coin').typeError('invalid_format').required('required'),
    }),
};
