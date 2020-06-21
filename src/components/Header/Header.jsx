import React from "react";
import style from './Header.module.css';
import logo from "./images/logo.jpg";
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={style.header}>
            <img src={logo} className={style.logo} alt="here will be logo"/>
            <div className={style.login}>
                {props.isAuth  ? <div>{props.login} - <button onClick={props.logoutUser}>Log Out</button> </div> : <NavLink to={'/login'} className={style.login_link}> Login </NavLink>}
            </div>
        </header>
    );
}

export default Header;