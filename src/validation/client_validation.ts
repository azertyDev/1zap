import * as yup from 'yup';

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
        surname: yup.string().trim().required(`required`),
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
        searchVal: yup.string().trim().min(4, '').required(''),
    }),
    vimRequest: yup.object().shape({
        vinNumber: yup.string().required('required'),
        yearIssue: yup
            .string()
            .max(4, 'year_length')
            .matches(/\d\d\d\d/, 'invalid_format')
            .required('required'),
        modification: yup.string().required('required'),
        brand: yup.string().required('required'),
        model: yup.string().required('required'),
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
};
