import * as yup from 'yup';

export const LoginVal = yup.object().shape({
    email: yup.string().email('').required(''),
});
