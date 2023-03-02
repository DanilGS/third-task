import axios from "axios";
import {setUser} from "../reducers/userReducer";

export const loginFunc =  (login, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://91.193.183.139:7000/auth/login`, {
                login,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export default loginFunc;