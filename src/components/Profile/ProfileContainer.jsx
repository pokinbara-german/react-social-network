/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile} from "../../reducers/profileReducer";
import {withRouter} from 'react-router-dom';

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.props.getProfile(this.props.match.params.userId);
    }
    render() {
        return <Profile {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return {profile: state.profilePage.profile}
}

export default connect(mapStateToProps, {getProfile}) (withRouter(ProfileContainer));