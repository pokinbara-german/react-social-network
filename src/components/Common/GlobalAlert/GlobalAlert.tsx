import React, {Dispatch, SetStateAction} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

type globalAlertPropsType = {
    isOpen: boolean,
    text: string,
    setNotificationOpen: Dispatch<SetStateAction<boolean>>
}

/**
 * Component for smooth popup alert.
 * @param {globalAlertPropsType} props
 * @constructor
 */
export const GlobalAlert: React.FC<globalAlertPropsType> = (props) => {
    const handleNotificationClose = (event: React.SyntheticEvent | MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        props.setNotificationOpen(false);
    };

    return (
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                  open={props.isOpen}
                  onClose={handleNotificationClose}
                  autoHideDuration={6000}
                  TransitionComponent={Slide}
                  message={props.text}
        />
    );
}