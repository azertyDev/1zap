import * as yup from 'yup';

export const becomeProviderValidation = yup.object().shape({
    username: yup.string().trim().min(2).required(``),
    surname: yup.string().trim().min(2).required(``),
    lastname: yup.string().trim().min(2).required(``),
    phone: yup
        .string()
        .trim()
        .matches(/\+998 \d\d \d\d\d\d\d\d\d/, "Неверный формат")
        .required("Обязательное поле"),
});

