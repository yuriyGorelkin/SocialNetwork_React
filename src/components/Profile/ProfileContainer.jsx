import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {

    componentDidMount() {
        let userID = this.props.match.params.userId;
        if (!userID) userID = this.props.authorizedUserID;
        this.props.getUserProfile(userID);
        this.props.getStatus(userID);
    }


    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
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
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);
