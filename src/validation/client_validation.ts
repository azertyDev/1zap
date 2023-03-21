import * as yup from 'yup';

export const client_validation = {
    becomeProvider: yup.object().shape({
        username: yup.string().trim().min(2).required(``),
        surname: yup.string().trim().min(2).required(``),
        lastname: yup.string().trim().min(2).required(``),
        phone: yup
            .string()
            .trim()
            .matches(/\+998 \d\d \d\d\d\d\d\d\d/, 'invalid_format')
            .required('required'),
    }),
    book: yup.object().shape({
        surname: yup.string().trim().min(2).required(``),
        contactNumber: yup
            .string()
            .trim()
            .matches(/\+998 \d\d \d\d\d\d\d\d\d/, 'invalid_format')
            .required('required'),
    }),
    login: yup.object().shape({
        email: yup.string().email('invalid_format').required('required'),
    }),
    loginForgot: yup.object().shape({
        email: yup.string().email('').required(''),
    }),
    vimRequest: yup.object().shape({
        vinNumber: yup.string().required('required'),
        yearIssue: yup.string().required('required'),
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
    }),
};
