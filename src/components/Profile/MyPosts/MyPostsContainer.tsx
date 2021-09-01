/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {connect} from "react-redux";
import MyPosts, {myPostsPropsType} from "./MyPosts";
import {appStateType} from '../../../redux/reduxStore';

let mapStateToProps = (state: appStateType) => {
    return (
        {
            postsData: state.profilePage.postsData,
            avatar: state.profilePage.profile ? state.profilePage.profile.photos.small : ''
        }
    );
};

const MyPostsContainer = connect<myPostsPropsType, {}, {}, appStateType>(
    mapStateToProps,
    {}
)(MyPosts);

export default MyPostsContainer;