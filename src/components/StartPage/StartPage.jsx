import React from "react";
import {Redirect, withRouter} from "react-router-dom";

const StartPage = (props) => {
    if (props.match && props.match.url === '/' && props.match.isExact) {
        return <Redirect to={'/profile'}/>;
    }

    return <div/>;
}

export default withRouter(StartPage);