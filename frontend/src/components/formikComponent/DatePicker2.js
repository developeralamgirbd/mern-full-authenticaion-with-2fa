import React from 'react';
import {ErrorMessage, Field} from "formik";
import DateView from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'
import TextError from "./TextError";

function DatePicker2({name, label, error, ...rest}) {
    return (
        <div className='form-group py-3'>
            <label htmlFor={name} className='form-label d-block'>{label}</label>
            <Field name={name} id={name} {...rest}>
                {
                    ({form, field}) => {
                        const {setFieldValue} = form;
                        const {value} = field;

                        return <DateView id={name}  {...field} value={value} onChange={val => setFieldValue(name, val)}/>
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
}

export default DatePicker2;