class SessionHelper{
    setUser = (userInfo)=>{
        const {_id, name, email, role, twoFA, verified} = userInfo;
        localStorage.setItem('user', JSON.stringify({_id, name, email, role, twoFA, verified}))
    }
    setToken = (token)=>{
        localStorage.setItem('token', token)
    }
    getUser = ()=> {
        return JSON.parse(localStorage.getItem('user'))
    }
    getToken = ()=> {
        return localStorage.getItem('token')
    }
    setEmailVerify = (value)=>{
        localStorage.setItem('email-verify', JSON.stringify(value))
    }
    getEmailVerify = ()=>{
        return JSON.parse(localStorage.getItem('email-verify'))
    }
    removeEmailVerify = ()=>{
        localStorage.removeItem('email-verify');
    }
    removeSession = ()=>{
        localStorage.clear();
        window.location.href="/login"
    }
}

export const {setUser, setToken, getUser, getToken, setEmailVerify, getEmailVerify, removeEmailVerify, removeSession} = new SessionHelper();