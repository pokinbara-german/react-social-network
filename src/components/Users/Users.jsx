import React from "react";
import styles from './Users.module.css';
import axios from "axios";
import userMale from "../../assets/images/user-male.png"

class Users extends React.Component {
    componentDidMount() {
        if (this.props.usersPage.length === 0) {
            // props.setUsers([
            //     {id:1, name: 'Andrey', followed: true, status: 'Yo', location: {country: 'Russia', city: 'Moscow'}},
            //     {id:2, name: 'Sergey', followed: false, status: 'Yo!', location: {country: 'Russia', city: 'Norilsk'}},
            //     {id:3, name: 'Misha', followed: true, status: 'Yo!!', location: {country: 'Russia', city: 'Novgorod'}}
            //     ]);
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then( response => {
                if (response.data.items.length === 0) {
                    return;
                }

                this.props.setUsers(response.data.items.slice(0, 4));
            });
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.usersPage.map( (user, userIndex) =>
                        <div key={'User' + userIndex} className={styles.user}>
                            <span>
                                <div>
                                    <img className={styles.photo} alt='ava' src={user.photos.small !== null ? user.photos.small : userMale}/>
                                </div>
                                <div>
                                    {user.followed
                                        ? <button onClick={ () => this.props.unfollowUser(user.id)}>Unfollow</button>
                                        : <button onClick={ () => this.props.followUser(user.id)}>Follow</button>
                                    }
                                </div>
                            </span>
                            <span>
                                <span>
                                    <div>{user.name}</div>
                                    <div>{user.status !== null ? user.status : 'No status'}</div>
                                </span>
                                <span>
                                    <div>{'user.location.country'}</div>
                                    <div>{'user.location.city'}</div>
                                </span>
                            </span>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Users;