import React, {useState} from 'react';
import {Form, Formik} from "formik";
import FormikControl from "./formikComponent/FormikControl";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {login, resetLinkSend, resetPassword} from "../APIRequest/userApi";
import {setToken, setUser} from "../helpers/sessionHelper";

const ForgotPassword = () => {

    const [success, setSuccess] = useState('');
    const [serverError, setServerError] = useState('');

    const initialValues = {
        email: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email().required('Email is required')
    });

    const onSubmit = async (values, {setErrors, setSubmitting, resetForm}) => {
        const res = await resetLinkSend(values);
        if (res.data.emailError || res.data.error){
            setErrors({email: res.data.emailError});
            setServerError(res.data.error)

        }else {
            console.log(res.data.message)
            setSuccess(res.data.message)
            setSubmitting(false)
            resetForm()
        }

    };

    return (
        <>
            <p className={success ? 'text-success': 'text-danger'}> {success ? success: serverError}</p>
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
                        <button type='submit' className='btn btn-primary mt-4' disabled={isSubmitting}>
                            {isSubmitting ? 'sending...': 'Reset link send'}
                        </button>
                    </Form>

            }
        </Formik>
        </>
    );
};

export default ForgotPassword;