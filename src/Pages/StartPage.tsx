import React from "react";
import {Redirect} from "react-router-dom";

const StartPage = () => {
    return <Redirect to={'/profile'}/>;
}

export default StartPage;