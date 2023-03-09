import * as yup from 'yup';

export const client_validation = {
    becomeProvider: yup.object().shape({
        username: yup.string().trim().min(2).required(`Обезательное поле`),
        surname: yup.string().trim().min(2).required(`Обезательное поле`),
        lastname: yup.string().trim().min(2).required(`Обезательное поле`),
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
        email: yup.string().email('').required('Обезательное поле'),
        password: yup.string().required('Обезательное поле'),
    }),
    loginForgot: yup.object().shape({
        email: yup.string().email('').required(''),
    }),
    vimRequest: [
        {
            firstForm: yup.object().shape({
                vinNumber: yup.string().required('Обезательное поле'),
                yearIssue: yup.string().required('Обезательное поле'),
                modification: yup.string().required('Обезательное поле'),
                brand: yup.string().required('Обезательное поле'),
                model: yup.string().required('Обезательное поле'),
            }),
        },
        {
            secondForm: yup.object().shape({
                username: yup.string().required('Обезательное поле').min(2),
                surname: yup.string().required('Обезательное поле').min(2),
                phone: yup.string().required('Обезательное поле'),
                email: yup.string().email('').required('Обезательное поле'),
                face: yup.string().required('Обезательное поле').min(1),
                city: yup.string().required('Обезательное поле').min(1),
            }),
        },
    ],
};
