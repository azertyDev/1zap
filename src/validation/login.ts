import * as yup from 'yup';

export const LoginVal = yup.object().shape({
    // username: yup
    //     .string()
    //     .trim()
    //     .min(2, "Поле должно содержать не менее 2 символов")
    //     .required(`Обязательное поле`),
    // phone: yup
    //     .string()
    //     .trim()
    //     .matches(/\(\d\d\) \d\d\d-\d\d-\d\d/, "Неверный формат")
    //     .required("Обязательное поле"),
    email: yup.string().email('').required(''),
});
