import React from "react";
import style from './ProfileInfo.module.css';
import contentBgcImg from "../images/AAHukvt.jpg";
import Preloader from "../../Common/Preloader/Preloader";
import profilePhoto from '../../../application/images/profileFoto.jpg';
import ProfileStatus from "../ProfileStatus";


const ProfileInfo = (props) => {
    if (!props.profile) return <Preloader/>

    return (
        <div>
            <div>
                {/*<img src={contentBgcImg} className={style.img} alt=""/>*/}
            </div>
            <div className={style.descriptionInfo}>
                <img src={props.profile.photos.large !== null ? props.profile.photos.large : profilePhoto} alt="here will be profilePhoto"/>
                <div> {props.profile.fullName} </div>
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    );
}

export default ProfileInfo;