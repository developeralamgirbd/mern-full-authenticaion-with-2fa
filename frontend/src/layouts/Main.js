import React from 'react';
import Header from "./Header";
import {Outlet} from "react-router-dom";
import {getEmailVerify} from "../helpers/sessionHelper";

function Main(props) {
    const emailVerify = getEmailVerify();
    return (
        <>
            {emailVerify && emailVerify.sendEmail === 'true' ? <Outlet/> :
                <>
                    <div className='container'>
                        <Header/>
                        <Outlet/>
                    </div>
                </>
            }
        </>
    );
}

export default Main;