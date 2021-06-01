/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logout} from "../../reducers/authReducer";
import {stringOrNull} from "../../reducers/types/types";
import {appStateType} from "../../redux/reduxStore";

type mapStatePropsType = {
    isAuth: boolean,
    login: stringOrNull
};

type mapDispatchPropsType = {
    logout: () => void
};

type ownPropsType = {
};

export type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType;

class HeaderContainer extends React.Component<propsType> {
    render() {
        return <Header {...this.props} />
    }
}

let mapStateToProps = (state: appStateType): mapStatePropsType => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    }
}

export default connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, appStateType>(mapStateToProps, {logout}) (HeaderContainer);