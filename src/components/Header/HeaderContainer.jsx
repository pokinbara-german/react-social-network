/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {setAuth} from "../../reducers/authReducer";
import {Api} from "../API/api";

class HeaderContainer extends React.Component {
    componentDidMount() {
        Api.Auth.Me().then(data => {
            if (data === null) {
                return;
            }

            let {id, email, login} = data;
            this.props.setAuth(id, email, login);
        });
    }

    render() {
        return <Header {...this.props} />
    }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

export default connect(mapStateToProps, {setAuth}) (HeaderContainer);