/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import ProfileInfo, {propsType} from './ProfileInfo/ProfileInfo';
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type profilePropsType = propsType;

const Profile: React.FC<profilePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         statusFetching={props.statusFetching}
                         isOwner={props.isOwner}
                         savePhoto={props.savePhoto}
                         saveProfile={props.saveProfile}
            />
            <MyPostsContainer/>
        </div>);
};

export default Profile;