import React from 'react';
import {ErrorMessage, Field} from "formik";
import TextError from "./TextError";

function TextArea({name, label, error, ...rest}) {
    return (
        <div className='form-group py-3'>
            <label htmlFor={name} className='form-label'>{label}</label>
            <Field as='textarea' id={name} name={name} {...rest} className={`form-control ${error}`}/>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
}

export default TextArea;