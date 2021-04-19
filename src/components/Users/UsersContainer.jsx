/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import {followCreator, setUsersCreator, unfollowCreator} from "../../reducers/usersReducer";
import {connect} from "react-redux";
import Users from "./Users";

let mapStateToProps = (state) => {
    return (
        {usersPage: state.usersPage.users}
    );
};

let mapDispatchToProps = (dispatch) => {
    return (
        {
            followUser: (userId) => {
                dispatch(followCreator(userId));
            },
            unfollowUser: (userId) => {
                dispatch(unfollowCreator(userId));
            },
            setUsers: (users) => {
                dispatch(setUsersCreator(users));
            }
        }
    );
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;