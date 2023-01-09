import React, {useState} from 'react';
import {ErrorMessage, Field} from "formik";
import TextError from "./TextError";

const PreviewImage = ({file})=> {

    const [src, setSrc] = useState('');

    if (file.length !== 0) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setSrc(reader.result);
        reader.onerror = error => console.log(error);
    }



    return (
       <>
           {
               src && <div className='card w-25 h-25 mt-2 p-1'>
                   <img src={src} alt="" className='img-fluid'/>
               </div>
           }
       </>
    )
}

const ImageInput = ({name, label, error, ...rest}) =>{
    return (
        <div className='form-group mt-3 d-block w-100'>
            <label htmlFor={name} className='form-label'>{label}</label>
            <Field id={name} name={name} {...rest} className={`form-control ${error}`}>
                {
                    ({form, field}) => {
                        const {setFieldValue} = form
                        const {value} = field;
                       return <>
                           <input className='form-control' type='file' id={name} name={name} onChange={event => {
                                   setFieldValue(name, event.target.files[0])
                                }
                           }/>

                           <PreviewImage file={value}/>

                       </>

                    }
                }
            </Field>

            <ErrorMessage name={name} component={TextError}/>
        </div>
    );
}

export default ImageInput;