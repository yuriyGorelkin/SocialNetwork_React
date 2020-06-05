import React from "react";
import style from './NavBar.module.css';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className={style.nav}>
            <div className={style.item}>
                <NavLink to='/profile'  className={style.link} activeClassName={style.active}> Profile </NavLink>
            </div>
            <div className={style.item}>
                <NavLink to='/dialogs' className={style.link} activeClassName={style.active}> Messages </NavLink>
            </div>
            <div className={style.item}>
                <NavLink  to='/news' className={style.link} activeClassName={style.active}> News </NavLink>
            </div>
            <div className={style.item}>
                <NavLink  to='/music' className={style.link} activeClassName={style.active}> Music </NavLink>
            </div>
            <div className={style.item}>
                <NavLink  to='/settings' className={style.link} activeClassName={style.active}> Settings </NavLink>
            </div>
        </nav>
    );
}

export default NavBar;