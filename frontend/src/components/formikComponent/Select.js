import React from 'react';
import {ErrorMessage, Field} from "formik";
import TextError from "./TextError";

function Select({name, label, error, options, ...rest}) {
    return (
        <div className='form-group py-3'>
            <label htmlFor={name} className='form-label'>{label}</label>
            <Field as='select' id={name} name={name} {...rest} className={`form-control ${error}`}>
                {
                    options.map((option) => {
                        return(
                            <option key={option.value} value={option.value}>
                                {option.key}
                            </option>
                        )
                    })
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
}

export default Select;