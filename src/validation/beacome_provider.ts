import * as yup from 'yup';

export const becomeProviderOne = yup.object().shape({
    username: yup.string().trim().min(2).required(``),
    surname: yup.string().trim().min(2).required(``),
    lastname: yup.string().trim().min(2).required(``),
    contactNumber: yup
        .string()
        .trim()
        .matches(/\+998 \d\d\ \d\d\d\d\d\d\d/, "Неверный формат")
        .required("Обязательное поле"),
});

export const becomeProviderSec = yup.object().shape({
    companyName: yup.string().trim().min(2).required(``),
    address: yup.string().trim().min(2).required(``),
    nameBoss: yup.string().trim().min(2).required(``),
    inn: yup.string().trim().min(2).required(``),
    okd: yup.string().trim().min(2).required(``),
    bankName: yup.string().trim().min(2).required(``),
    check: yup.string().trim().min(2).required(``),
});
