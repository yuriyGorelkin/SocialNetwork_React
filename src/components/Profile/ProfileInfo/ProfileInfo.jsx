import React, { useState } from "react";
import styles from './ProfileInfo.module.css';
import Preloader from "../../Common/Preloader/Preloader";
import profilePhoto from '../../../application/images/profileFoto.jpg';
import ProfileStatusWithHooks from "../ProfileStatusWithHooks";
import ProfileData from "./ProfileData";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

    const [isEditMode, setEditMode] = useState(false);

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            const file = e.target.files[0];
            savePhoto(file);
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData).then(() => {
            setEditMode(false);
        })
    }


    if (!profile) return <Preloader />

    return (
        <div>
            <div className={styles.descriptionInfo}>
                <img src={profile.photos.large || profilePhoto} className={styles.img} alt="here will be profilePhoto" />
                {isOwner && <input type='file' onChange={onMainPhotoSelected} />}
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
                <div>
                    {isEditMode
                        ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                        : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => {
                            setEditMode(true)
                        }} />
                    }

                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;


