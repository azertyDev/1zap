import * as yup from 'yup';

export const client_validation = {
    becomeProvider: yup.object().shape({
        username: yup.string().trim().min(2).required(``),
        surname: yup.string().trim().min(2).required(``),
        lastname: yup.string().trim().min(2).required(``),
        phone: yup
            .string()
            .trim()
            .matches(/\+998 \d\d \d\d\d\d\d\d\d/, 'Неверный формат')
            .required('Обязательное поле'),
    }),
    book: yup.object().shape({
        surname: yup.string().trim().min(2).required(``),
        contactNumber: yup
            .string()
            .trim()
            .matches(/\+998 \d\d \d\d\d\d\d\d\d/, 'Неверный формат')
            .required('Обязательное поле'),
    }),
    login: yup.object().shape({
        email: yup.string().email('').required(''),
    }),
    loginForgot: yup.object().shape({
        email: yup.string().email('').required(''),
    }),
    vimRequest: [
        {
            firstForm: yup.object().shape({
                vinNumber: yup.string().required(''),
                yearIssue: yup.string().required(''),
                modification: yup.string().required(''),
                brand: yup.string().required(''),
                model: yup.string().required(''),
            }),
        },
        {
            secondForm: yup.object().shape({
                username: yup.string().required('').min(2),
                surname: yup.string().required('').min(2),
                phone: yup.string().required(''),
                email: yup.string().email('').required(''),
                face: yup.string().required('').min(1),
                city: yup.string().required('').min(1),
            }),
        },
    ],
};
