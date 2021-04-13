/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './DialogsItem.module.css';
import {NavLink} from 'react-router-dom';

const DialogsItem = (props) => {
    let path = "/messages/" + props.id;

    return (
        <div className={styles.dialog}>
            <img alt='ava' src="https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"/>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
}

export default DialogsItem;