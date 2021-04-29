/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {setProfile} from "../../reducers/profileReducer";
import {withRouter} from 'react-router-dom';
import {Api} from "../API/api";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId || 2;

       Api.Profile.getProfile(userId)
            .then( data => {
                if (data === null) {
                    return;
                }

                this.props.setProfile(data);
            });
    }
    render() {
        return <Profile {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return {profile: state.profilePage.profile}
}

export default connect(mapStateToProps, {setProfile}) (withRouter(ProfileContainer));