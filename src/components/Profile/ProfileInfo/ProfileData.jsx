import React from "react";
import styles from "./ProfileInfo.module.css";

const ProfileData = ({profile, goToEditMode}) => {
    return <div>
        <div><button onClick={goToEditMode}>Edit</button></div>
        <div>
            <b>Full Name:</b> {profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'yes' : 'no'}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professional skills:</b> {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me:</b> {profile.aboutMe}
        </div>
        <div>
            <b>My contacts:</b> {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
    </div>
}

export default ProfileData


const Contact = ({contactTitle, contactValue}) => {
    return <div className={styles.contact}>
        <b>{contactTitle}: </b> {contactValue}
    </div>
}