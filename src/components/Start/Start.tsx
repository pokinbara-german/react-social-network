import React from "react";
import {Redirect} from "react-router-dom";

/**
 * Page which will show to user after app-initialization end.
 * @constructor
 */
export const Start = () => {
    return <Redirect to={'/profile'}/>;
}