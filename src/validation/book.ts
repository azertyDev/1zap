import * as yup from 'yup';

export const bookValidation = yup.object().shape({
    surname: yup.string().trim().min(2).required(``),
    contactNumber: yup
        .string()
        .trim()
        .matches(/\+998 \d\d\ \d\d\d\d\d\d\d/, "Неверный формат")
        .required("Обязательное поле"),
});