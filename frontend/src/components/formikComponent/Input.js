import React from 'react';
import {ErrorMessage, Field} from "formik";
import TextError from "./TextError";

function Input({name, label, error, ...rest}) {
    return (
        <div className='form-group mt-3 d-block w-100'>
            <label htmlFor={name} className='form-label'>{label}</label>
            <Field id={name} name={name} {...rest} className={`form-control ${error}`}/>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
}

export default Input;