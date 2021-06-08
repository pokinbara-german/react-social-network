import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {appStateType} from '../redux/reduxStore';

type mapStatePropsType = {
    isAuth: boolean
}

function withAuthRedirect<WCP> (Component: React.ComponentType<WCP>) {
    let mapStateToProps = (state: appStateType) => {
        return (
            {isAuth: state.auth.isAuth}
        );
    };

    const AuthRedirect: React.FC<mapStatePropsType & {}> = (props) => {
        let {isAuth, ...restProps} = props;

        if (!isAuth) {
            return <Redirect to='/login'/>
        }

        return <Component {...restProps as WCP}/>;
    }

    return connect(mapStateToProps)(AuthRedirect);
}

export default withAuthRedirect;