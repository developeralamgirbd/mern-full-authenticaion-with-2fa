import axios from "axios";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const register = async (userBody)=>{

    try {
        return await axios.post(baseUrl+'/register', userBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }catch (error) {
        return error.response
    }


}
export const login = async (userBody)=>{
    try {
        return await axios.post(baseUrl+'/login', userBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }catch (error) {
        return error.response
    }
}

export const resendEmailApi = async (email)=>{
    try {
        return await axios.get(`${baseUrl}/resend-email/${email}`);
    }catch (error) {
        return error.response
    }
}

export const emailVerifyApi = async (email, token)=>{
    try {
        return await axios.get(`${baseUrl}/email-verify/${email}/${token}`);
    }catch (error) {
        return error.response
    }
}

