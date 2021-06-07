/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {profileActions} from "../../../reducers/profileReducer";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";

let mapStateToProps = (state) => {
    return (
        {
            postsData: state.profilePage.postsData,
            avatar: state.profilePage.profile ? state.profilePage.profile.photos.small : ''
        }
    );
};

const MyPostsContainer = connect(mapStateToProps, {sendPost: profileActions.sendPost})(MyPosts);

export default MyPostsContainer;