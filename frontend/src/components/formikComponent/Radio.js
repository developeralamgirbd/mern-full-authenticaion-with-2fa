import React from 'react';
import {ErrorMessage, Field} from "formik";
import TextError from "./TextError";

function Radio({name, label, error, options, ...rest}) {
    return (
        <div className='form-group py-3'>
            <label htmlFor={name} className='form-label d-block'>{label}</label>
            <Field name={name} {...rest}>
                {
                    ({field}) => {
                        return options.map(option => {
                            return (
                                <div key={option.key} className='form-check form-check-inline'>
                                    <input
                                        type="radio"
                                        id={option.value}
                                        {...field}
                                        value={option.value}
                                        checked={field.value === option.value}
                                        className='form-check-input'
                                    />
                                    <label htmlFor={option.value} className='form-check-label'>{option.key}</label>
                                </div>
                            )
                        })
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
}

export default Radio;