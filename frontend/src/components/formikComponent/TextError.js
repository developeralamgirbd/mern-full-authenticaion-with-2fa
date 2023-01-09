import React from 'react';

function TextError({children}) {
    return (
        <div className='text-danger'>
            {children}
        </div>
    );
}

export default TextError;