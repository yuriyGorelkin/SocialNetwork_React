import React from "react";
import style from './Header.module.css';
import logo from "./images/logo.jpg";

const Header = () => {
    return (
        <header className={style.header}>
            <img src={logo} className={style.logo} alt="here will be logo"/>
        </header>
    );
}

export default Header;