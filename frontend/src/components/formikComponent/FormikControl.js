import React from 'react';
import Input from "./Input";
import TextArea from "./TextArea";
import Select from "./Select";
import Radio from "./Radio";
import CheckBox from "./CheckBox";
import DatePicker2 from "./DatePicker2";
import ImageInput from "./ImageInput";

function FormikControl({control, ...rest}) {
   switch (control){
       case 'input':
           return <Input {...rest}/>;
       case 'textarea':
           return <TextArea {...rest}/>
       case 'select':
           return <Select {...rest}/>
       case 'radio':
           return <Radio {...rest}/>
       case 'checkbox':
           return <CheckBox {...rest}/>
       case 'date':
           return <DatePicker2 {...rest}/>
       case 'file':
           return <ImageInput {...rest}/>
       default: return null
   }
}

export default FormikControl;