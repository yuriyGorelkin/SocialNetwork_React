import React from "react";
import styles from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import profilePhoto from '../../../application/images/profileFoto.jpg';
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {

    if (!profile) return <Preloader/>

    return (
        <div>
            <div className={styles.descriptionInfo}>
                <img src={profile.photos.large !== null ? profile.photos.large : profilePhoto} className={styles.img} alt="here will be profilePhoto"/>
                <div> {profile.fullName} </div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    );
}

export default ProfileInfo;