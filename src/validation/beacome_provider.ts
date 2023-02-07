import * as yup from 'yup';

export const becomeProviderOne = yup.object().shape({
    username: yup.string().trim().min(2).required(``),
    surname: yup.string().trim().min(2).required(``),
    lastname: yup.string().trim().min(2).required(``),

    // phone: yup
    //     .string()
    //     .trim()
    //     .matches(/\(\d\d\) \d\d\d-\d\d-\d\d/, "Неверный формат")
    //     .required("Обязательное поле"),
});
