/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Post.module.css';
import userMale from "../../../../assets/images/user-male.png";

type postPropsType = {
    message: string,
    likeCount: number,
    avatar: string
}

const Post: React.FC<postPropsType> = (props) => {
    let avatarSmall = props.avatar || userMale;

    return( 
        <div className={styles.item}>
            <img alt='ava' src={avatarSmall}/>
            <span>{props.message}</span>
            <div>like {props.likeCount}</div>
        </div>);
};

export default Post;