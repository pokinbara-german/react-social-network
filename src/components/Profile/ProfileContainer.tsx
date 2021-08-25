/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus, saveProfile, updateStatus} from "../../reducers/profileReducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import withAuthRedirect from "../../Hocs/withAuthRedirect";
import {MatchParams, profileType} from "../../types";
import {appStateType} from "../../redux/reduxStore";

type matchType = RouteComponentProps<MatchParams>;

type mapStatePropsType = {
    profile: profileType | null,
    status: string,
    statusFetching: boolean
};

type mapDispatchPropsType = {
    getProfile: (userId: number) => void,
    getStatus: (userId: number) => void,
    updateStatus: (status: string) => void,
    saveProfile: (profile: profileType) => void
};

type ownPropsType = {
};

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType;

/**
 * Class component which returns profile-page.
 * If not logged-in will redirect to login.
 */
class ProfileContainer extends React.Component<propsType & matchType> {
    getProfileData() {
        this.props.getProfile(parseInt(this.props.match.params.userId));
        this.props.getStatus(parseInt(this.props.match.params.userId));
    }

    componentDidMount() {
        this.getProfileData();
    }

    componentDidUpdate(prevProps: mapStatePropsType  & matchType, prevState: appStateType, snapshot: any) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.getProfileData();
        }
    }
    render() {
        return <Profile {...this.props} isOwner={!this.props.match.params.userId}/>
    }
}

let mapStateToProps = (state: appStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        statusFetching: state.profilePage.statusFetching
    }
}

const mapDispatchToProps: mapDispatchPropsType = {
    getProfile,
    getStatus,
    updateStatus,
    saveProfile
}

export default connect<
    mapStatePropsType,
    mapDispatchPropsType,
    ownPropsType,
    appStateType
    >(mapStateToProps, mapDispatchToProps) (withRouter(withAuthRedirect(ProfileContainer)));