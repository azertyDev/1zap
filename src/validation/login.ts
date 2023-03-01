import * as yup from 'yup';

export const LoginValidation = yup.object().shape({
    email: yup.string().email('').required('required'),
    password: yup.string().required('required'),
});

export const LoginForgotValidation = yup.object().shape({
    email: yup.string().email('').required('required'),
});
