import axios from "axios";
const baseUrl = 'http://localhost:8000/api/v1';

export const imageUpload = async (data)=>{
    try {
        const res = await axios.post(baseUrl+'/upload', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return res.data
    }catch (e) {
        return e
    }
}
