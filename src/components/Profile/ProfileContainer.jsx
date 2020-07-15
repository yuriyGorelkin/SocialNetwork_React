import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";


class ProfileContainer extends React.Component {

    refreshProfile() {
        let userID = this.props.match.params.userId;
        if (!userID) {
            userID = this.props.authorizedUserID;
            if (!userID) {
                this.props.history.push('/login');
            }
        }
        this.props.getUserProfile(userID);
        this.props.getStatus(userID);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }


    render() {
        return (
            <Profile profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     isOwner={!this.props.match.params.userId}
                     savePhoto = {this.props.savePhoto}
                     saveProfile = {this.props.saveProfile}
            />
        )
    }
}


const mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserID: state.auth.userID
    }
}


export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withAuthRedirect,
    withRouter
)(ProfileContainer);
