/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {addPostCreator, updateNewPostCreator} from "../../../reducers/profileReducer";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";

let mapStateToProps = (state) => {
    return (
        {profilePage: state.profilePage}
    );
};

let mapDispatchToProps = (dispatch) => {
    return (
        {
            sendPost: () => {
                dispatch(addPostCreator());
            },
            updatePostMessage: (event) => {
                let message = event.target.value;
                dispatch(updateNewPostCreator(message));
            }
        }
    );
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;