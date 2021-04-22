/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import axios from "axios";
import {setProfile} from "../../reducers/profileReducer";

class ProfileContainer extends React.Component {
    componentDidMount() {
        axios.get('https://social-network.samuraijs.com/api/1.0/profile/' + 2)
            .then( response => {
                if (response.data.length === 0) {
                    return;
                }

                this.props.setProfile(response.data);
            });
    }
    render() {
        return <Profile {...this.props}/>
    }
}

let mapStateToProps = (state) => {
    return {profile: state.profilePage.profile}
}

export default connect(mapStateToProps, {setProfile}) (ProfileContainer);