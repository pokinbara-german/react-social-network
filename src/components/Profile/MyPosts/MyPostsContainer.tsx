/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {profileActions} from "../../../reducers/profileReducer";
import {connect} from "react-redux";
import MyPosts, {mapDispatchPropsType, mapStatePropsType} from "./MyPosts";
import {appStateType} from '../../../redux/reduxStore';

let mapStateToProps = (state: appStateType) => {
    return (
        {
            postsData: state.profilePage.postsData,
            avatar: state.profilePage.profile ? state.profilePage.profile.photos.small : ''
        }
    );
};

const MyPostsContainer = connect<mapStatePropsType, mapDispatchPropsType, {}, appStateType>(
    mapStateToProps,
    {sendPost: profileActions.sendPost}
)(MyPosts);

export default MyPostsContainer;