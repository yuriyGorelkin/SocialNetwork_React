import React from "react";
import style from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import profilePhoto from '../../../application/images/profileFoto.jpg';
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";


const ProfileInfo = (props) => {
    if (!props.profile) return <Preloader/>

    return (
        <div>
            <div className={style.descriptionInfo}>
                <img src={props.profile.photos.large !== null ? props.profile.photos.large : profilePhoto} alt="here will be profilePhoto"/>
                <div> {props.profile.fullName} </div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    );
}

export default ProfileInfo;