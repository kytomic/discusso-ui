import * as yup from 'yup';

export const UserLoginSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
});

export const UserSignUpSchema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), ''], 'Passwords must match'),
});
