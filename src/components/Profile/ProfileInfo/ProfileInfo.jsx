import React from "react";
import style from './ProfileInfo.module.css';
import contentBgcImg from "../images/AAHukvt.jpg";

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <img src={contentBgcImg} className={style.img} alt=""/>
            </div>
            <div className={style.descriptionInfo}> ava + description </div>
        </div>
    );
}

export default ProfileInfo;