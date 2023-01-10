import {createBrowserRouter} from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import EmailSendMsgPage from "../pages/EmailSendMsgPage";
import EmailVerifyPage from "../pages/EmailVerifyPage";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import NewPasswordPage from "../pages/NewPasswordPage";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/register',
                element: <ProtectedRoute><Register/></ProtectedRoute>
            },
            {
                path: '/login',
                element: <ProtectedRoute><Login/></ProtectedRoute>
            },
            {
                path: '/forgot-password',
                element: <ProtectedRoute><ForgotPasswordPage/></ProtectedRoute>
            },
            {
                path: '/new-password/:email/:token',
                element: <ProtectedRoute><NewPasswordPage/></ProtectedRoute>
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard/></PrivateRoute>
            },
            {
                path: '/verify',
                element: <EmailSendMsgPage/>
            },
            {
                path: '/email-verify/:email/:token',
                element: <EmailVerifyPage/>
            }
        ]
    }
]);

export default routes;