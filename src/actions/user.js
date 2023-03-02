import axios from 'axios'
import {setUser} from "../reducers/userReducer";

export const registration = async (login, password) => {
    try {
        const response = await axios.post(`http://91.193.183.139:7000/auth/register`, {
            login,
            password
        })
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }
}

