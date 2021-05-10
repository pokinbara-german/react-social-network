/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {sendPost} from "../../../reducers/profileReducer";
import {connect} from "react-redux";
import MyPosts from "./MyPosts";

let mapStateToProps = (state) => {
    return (
        {profilePage: state.profilePage}
    );
};

const MyPostsContainer = connect(mapStateToProps, {sendPost})(MyPosts);

export default MyPostsContainer;