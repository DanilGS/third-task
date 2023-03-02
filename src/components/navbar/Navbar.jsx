import React from 'react';
import './navbar.css'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer";

const Navbar = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    return (
        <div className="navbar">
            <div className="container">
                {!isAuth && <div className="navbar__login"><NavLink to="/auth/login">Войти</NavLink></div> }
                {!isAuth && <div className="navbar__registration"><NavLink to="/auth/register">Регистрация</NavLink></div> }
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logout()) }>Выход</div> }
            </div>
        </div>
    );
};

export default Navbar;
