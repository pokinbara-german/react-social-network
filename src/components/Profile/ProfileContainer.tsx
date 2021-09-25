import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfile, getStatus} from "../../reducers/profileReducer";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import withAuthRedirect from "../../Hocs/withAuthRedirect";
import {MatchParams} from "../../types";
import {appStateType} from "../../redux/reduxStore";

type matchType = RouteComponentProps<MatchParams>;

type mapStatePropsType = {
    ownerId: string | undefined
};

type mapDispatchPropsType = {
    getProfile: (userId: number) => void,
    getStatus: (userId: number) => void,
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
        let isUserIdExist = !!this.props.match.params.userId;
        let isOwner = isUserIdExist ? this.props.match.params.userId === this.props.ownerId : true;

        return <Profile {...this.props} isOwner={isOwner}/>
    }
}

let mapStateToProps = (state: appStateType) => {
    return {
        ownerId: state.profilePage.ownerProfile?.userId.toString()
    }
}

const mapDispatchToProps: mapDispatchPropsType = {
    getProfile,
    getStatus,
}

export default connect<
    mapStatePropsType,
    mapDispatchPropsType,
    ownPropsType,
    appStateType
    >(mapStateToProps, mapDispatchToProps) (withRouter(withAuthRedirect(ProfileContainer)));