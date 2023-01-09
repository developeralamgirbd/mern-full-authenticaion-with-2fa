import React from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from "./formikComponent/FormikControl";
import {register} from "../APIRequest/userApi";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {setEmailVerify} from "../helpers/sessionHelper";


function RegisterForm() {
    const navigate = useNavigate();
    const {setIsVerifyEmail} = useAuth();

    let initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('First Name is required'),
        email: Yup.string().email().required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .matches(/[a-z]+/, "One lowercase character")
            .matches(/[A-Z]+/, "One uppercase character")
            .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "One number")
            .min(8, "Must be 8 characters or more"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Password must match').required('Confirm password is required'),

    });

    const onSubmit = async (values, {setErrors, setSubmitting }) => {
        const res = await register(values);

        if (res.data.emailError){
           setErrors({email: res.data.emailError })
        }else {
            setSubmitting(false);
            const value = {
                sendEmail: 'true',
                email: res.data.user.email,
                confirmationToken: res.data.user.confirmationToken
            }
            setEmailVerify(value)
            navigate('/verify')
        }

    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {
                ({errors, touched, isSubmitting}) =>
                    <Form encType='multipart/form-data'>

                        {/*Name Field*/}
                        <FormikControl
                            control='input'
                            type='text'
                            label='Name'
                            name='name'
                            error={touched.name && errors.name && 'is-invalid'}
                        />
                        {/*Email Field*/}
                        <FormikControl
                            control='input'
                            type='email'
                            label='Email'
                            name='email'
                            error={touched.email && errors.email && 'is-invalid'}
                        />
                        {/*Password Field*/}
                        <FormikControl
                            control='input'
                            type='password'
                            label='Password'
                            name='password'
                            error={touched.password && errors.password && 'is-invalid'}
                        />
                        <small className='form-text text-muted'>Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character</small>
                        {/*Confirm Password Field*/}
                        <FormikControl
                            control='input'
                            type='password'
                            label='Confirm Password'
                            name='confirmPassword'
                            error={touched.confirmPassword && errors.confirmPassword && 'is-invalid'}
                        />
                        <button type='submit' className='btn btn-primary mt-4' disabled={isSubmitting}>{ isSubmitting ? 'Creating...' : 'Register' }</button>
                    </Form>

            }
        </Formik>


    );
}

export default RegisterForm;