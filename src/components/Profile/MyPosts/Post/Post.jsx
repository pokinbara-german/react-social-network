/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './Post.module.css';

const Post = (props) => {
    return( 
        <div className={styles.item}>
            <img alt='ava' src="https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"/>
            <span>{props.message}</span>
            <div>like {props.likeCount}</div>
        </div>);
};

export default Post;