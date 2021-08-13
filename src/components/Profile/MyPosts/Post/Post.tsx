/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import userMale from "../../../../assets/images/user-male.png";
import {stringOrNull} from '../../../../reducers/types/types';
import {Comment, Tooltip, Avatar, Divider} from 'antd';
import {LikeOutlined, LikeFilled} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {profileActions} from '../../../../reducers/profileReducer';

type postPropsType = {
    postId: string,
    message: string,
    likeCount: number,
    avatar: stringOrNull
}

const Post: React.FC<postPropsType> = (props) => {
    let avatarSmall = props.avatar || userMale;

    const dispatch = useDispatch();

    /**
     * Add like to post
     * @param {React.MouseEvent<HTMLSpanElement>} event - sets automatically, not need to put it
     */
    const like = (event: React.MouseEvent<HTMLSpanElement>) => {
        let targetId = event.currentTarget.id;
        let postId = targetId.substr(5);

        if (postId) {
            dispatch(profileActions.addLike(postId));
        }
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
          <span onClick={like} id={'post-' + props.postId}>
            {React.createElement(props.likeCount ? LikeFilled : LikeOutlined)}
              <span className="comment-action">{props.likeCount}</span>
          </span>
        </Tooltip>
    ];

    return(
        <div>
            <Comment
                actions={actions}
                content={props.message}
                avatar={<Avatar src={avatarSmall} alt="ava"/>}
            />
            <Divider />
        </div>
    );
};

export default Post;