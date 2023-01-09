import React from 'react';

import DateView from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import range from 'lodash/range';
import {getMonth, getYear} from 'date-fns';
import {ErrorMessage, Field} from "formik";
import TextError from "./TextError";

function DatePicker({name, label, error, ...rest}) {

    const years = range(1990, getYear(new Date()) + 1, 1);

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return (
        <div className='form-group py-3'>
            <label htmlFor={name} className='form-label d-block'>{label}</label>
            <Field name={name}>
                {
                    ({form, field})=>{
                        const {setFieldValue} = form;
                        const {value} = field;
                        return <DateView
                            renderCustomHeader={
                            ({
                                date,
                                changeYear,
                                changeMonth,
                                decreaseMonth,
                                increaseMonth,
                                prevMonthButtonDisabled,
                                nextMonthButtonDisabled,
                             }) => (
                                <div className='m-4 d-flex justify-content-center'>
                                    <button className='btn btn-primary mr-2' onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                        {"<"}
                                    </button>
                                    <select
                                        className='form-select mx-2'
                                        value={getYear(date)}
                                        onChange={({ target: { value } }) => changeYear(value)}
                                    >
                                        {years.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        className='form-select mx-2'
                                        value={months[getMonth(date)]}
                                        onChange={({ target: { value } }) =>
                                            changeMonth(months.indexOf(value))
                                        }
                                    >
                                        {months.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>

                                    <button className='btn btn-primary ml-2' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                        {">"}
                                    </button>
                                </div>
                            )}

                            id={name}
                            {...field}
                            {...rest}
                            selected={value}
                            onChange={val => setFieldValue(name, val)}
                        />
                    }
                }
            </Field>
            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
}

export default DatePicker;
