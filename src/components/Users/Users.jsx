import React from "react";
import styles from './Users.module.css';

const Users = (props) => {
    if (props.usersPage.length === 0) {
        props.setUsers([
            {id:1, name: 'Andrey', followed: true, status: 'Yo', location: {country: 'Russia', city: 'Moscow'}},
            {id:2, name: 'Sergey', followed: false, status: 'Yo!', location: {country: 'Russia', city: 'Norilsk'}},
            {id:3, name: 'Misha', followed: true, status: 'Yo!!', location: {country: 'Russia', city: 'Novgorod'}}
            ]);
    }

    return (
        <div>
            {
                props.usersPage.map( (user, userIndex) =>
                        <div key={'User' + userIndex}>
                            <span>
                                <div>
                                    <img className={styles.photo} alt='ava' src="https://png.pngtree.com/element_our/20190530/ourlarge/pngtree-520-couple-avatar-boy-avatar-little-dinosaur-cartoon-cute-image_1263411.jpg"/>
                                </div>
                                <div>
                                    {user.followed
                                        ? <button onClick={ () => props.unfollowUser(user.id)}>Unfollow</button>
                                        : <button onClick={ () => props.followUser(user.id)}>Follow</button>
                                    }
                                </div>
                            </span>
                            <span>
                                <span>
                                    <div>{user.name}</div>
                                    <div>{user.status}</div>
                                </span>
                                <span>
                                    <div>{user.location.country}</div>
                                    <div>{user.location.city}</div>
                                </span>
                            </span>
                        </div>
                )
            }
        </div>
    );
}

export default Users;