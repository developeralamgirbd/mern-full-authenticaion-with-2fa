import React, {useState} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from "./formikComponent/FormikControl";
import {imageUpload} from "../APIRequest/imageUpload";
import {useAuth} from "../hooks/useAuth";
import {useNavigate} from "react-router-dom";
import {login} from "../APIRequest/userApi";
import {setToken, setUser} from "../helpers/sessionHelper";

function LoginForm(props) {
    const [serverError, setServerError] = useState('');
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email().required('Email is required'),
        password: Yup.string().required('Password')

    });

    const onSubmit = async (values, {setErrors, setSubmitting}) => {
        const res = await login(values);

        if (res.data.emailError || res.data.passwordError || res.data.error){
            setErrors({email: res.data.emailError, password: res.data.passwordError});
            setServerError(res.data.error);

        }else {
            setSubmitting(false)
            setUser(res.data.user);
            setToken(res.data.token)
            navigate('/dashboard');
            window.location.href="/dashboard"
        }

    };


    return (
        <>
            <p className='text-danger'> {serverError}</p>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                {
                    ({errors, touched, isSubmitting}) =>
                        <Form>
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
                            <button type='submit' className='btn btn-primary mt-4' disabled={isSubmitting}>
                                {isSubmitting ? 'Log In...': 'Login'}
                            </button>
                        </Form>

                }
            </Formik>
        </>


    );
}

export default LoginForm;