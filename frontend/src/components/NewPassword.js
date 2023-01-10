import React, {useEffect, useState} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import FormikControl from "./formikComponent/FormikControl";
import {Link, useNavigate, useParams} from "react-router-dom";
import {login, resetPassword} from "../APIRequest/userApi";
import {setToken, setUser} from "../helpers/sessionHelper";
import {useAuth} from "../hooks/useAuth";

function NewPassword(props) {
    const [serverError, setServerError] = useState('');
    const navigate = useNavigate();
    const {email, token} = useParams();
    const {setSuccessMsg} = useAuth();
    const initialValues = {
        email: '',
        token: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        password: Yup.string()
            .required('Password is required')
            .matches(/[a-z]+/, "One lowercase character")
            .matches(/[A-Z]+/, "One uppercase character")
            .matches(/[@$!%*#?&]+/, "One special character")
            .matches(/\d+/, "One number")
            .min(8, "Must be 8 characters or more"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], 'Password must match').required('Confirm password is required'),

    });



    const onSubmit = async (values, {setErrors, setSubmitting}) => {
        values.email = email;
        values.token = token;
        console.log(values);
        const res = await resetPassword(values);
        if (res.data.passwordError || res.data.error){
            setErrors({password: res.data.passwordError});
            setServerError(res.data.error);
        }else {
            setSubmitting(false);
            setSuccessMsg(res.data.message)
            navigate('/login');
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
                            <button type='submit' className='btn btn-primary mt-4' disabled={isSubmitting}>
                                {isSubmitting ? 'Reset...': 'Reset Now'}
                            </button>
                        </Form>

                }
            </Formik>
        </>


    );
}

export default NewPassword;