/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, savePhoto, saveProfile, updateStatus} from "../../reducers/profileReducer";
import {withRouter} from 'react-router-dom';
import withAuthRedirect from "../../Hocs/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
    getProfileData() {
        this.props.getProfile(this.props.match.params.userId);
        this.props.getStatus(this.props.match.params.userId);
    }

    componentDidMount() {
        this.getProfileData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.getProfileData();
        }
    }
    render() {
        return <Profile {...this.props} isOwner={!this.props.match.params.userId}/>
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        statusFetching: state.profilePage.statusFetching
    }
}

let ComposedComponent = compose(withRouter, withAuthRedirect)(ProfileContainer);

export default connect(mapStateToProps, {getProfile, getStatus, updateStatus, savePhoto, saveProfile}) (ComposedComponent);