import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";
import {removeSession} from "../helpers/sessionHelper";

function Header() {
    const {currentUser} = useAuth();
    const logoutHandle = ()=>{
        removeSession();
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Logo</Link>
                <div className="">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        {
                            currentUser && currentUser._id ?
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to='/dashboard'>Dashboard</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <button className="btn " onClick={logoutHandle}>Log Out</button>
                                    </li>
                                </>
                                : <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to='/register'>Register</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to='/login'>Login</NavLink>
                                </li>
                            </>
                        }


                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;