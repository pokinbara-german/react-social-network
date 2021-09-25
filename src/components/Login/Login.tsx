import React from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {getCaptchaUrlSelector, getIsAuthSelector} from '../../selectors/selectors';
import LoginForm from './LoginForm/LoginForm';
import Typography from '@material-ui/core/Typography';
import {createStyles, makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        loginPage: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '80vh'
        }
    }),
);

/**
 * Login-page with header and form.
 * @constructor
 */
export const Login: React.FC = () => {
    const classes = useStyles();
    const auth = useSelector(getIsAuthSelector);
    const captchaUrl = useSelector(getCaptchaUrlSelector);

    if (auth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={classes.loginPage}>
            <Typography variant='h4'>Login</Typography>
            <LoginForm captchaUrl={captchaUrl}/>
        </div>
    );
}