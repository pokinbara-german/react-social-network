import React from 'react';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPosts from './MyPosts/MyPosts';

type profilePropsType = {
    isOwner: boolean,
}

/**
 * @const
 * @type string
 * @description block width (CSS value, i.e. "10px").
 */
const BLOCK_WIDTH = '52.5ch';

/**
 * Whole profile-page with info about user and posts-block.
 * @param {profilePropsType} props
 * @constructor
 */
const Profile: React.FC<profilePropsType> = (props) => {
    return (
        <div>
            <ProfileInfo isOwner={props.isOwner}
                         blockWidth={BLOCK_WIDTH}
            />
            <MyPosts blockWidth={BLOCK_WIDTH}/>
        </div>);
};

export default Profile;