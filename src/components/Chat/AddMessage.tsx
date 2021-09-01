import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sendMessage} from '../../reducers/chatReducer';
import {appStateType} from '../../redux/reduxStore';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {FormikHelpers, FormikProvider, useFormik} from 'formik';
import {createFieldF, formikField} from '../../Common/FormComponents/FieldsComponentsFormik';
import {maxLengthCreator, minLengthCreator, required, validatorCreator} from '../../utils/validators';

type formDataType = {
    newMessage: string
}

type fieldNamesType = keyof formDataType;

let minLength2 = minLengthCreator(2);
let maxLength100 = maxLengthCreator(100);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chatForm: {
            display: 'flex',
            flexDirection: 'column',
            margin: theme.spacing(1),
            width: '40ch',
            '& > *': {
                display: 'flex',
                margin: theme.spacing(1),
            },
        },
        sendButton: {
            alignSelf: 'start'
        },
        stretched: {
            flexGrow: 1,
        }
    }),
);

/**
 * Returns form for send message to chat.
 * @constructor
 */
export const AddMessage: React.FC = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isConnected = useSelector((state: appStateType) => state.chat.isConnected);

    function onSubmit(values: formDataType, {setSubmitting, resetForm}: FormikHelpers<formDataType>) {
        dispatch(sendMessage(values.newMessage));
        setSubmitting(false);
        resetForm();
    }

    const formik = useFormik({
        initialValues: {newMessage: ''},
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit} className={classes.chatForm}>
            <FormikProvider value={formik}>
                <Tooltip title={'You can type multiline. Just hit enter.'} aria-label='Hint' placement="right" arrow>
                    {createFieldF<fieldNamesType>(
                        classes.stretched,
                        'Type something',
                        'newMessage',
                        formikField,
                        validatorCreator([required, minLength2, maxLength100]),
                        {multiline: true}
                    )}
                </Tooltip>
            </FormikProvider>
            <Button className={classes.sendButton}
                    variant='contained'
                    color='primary'
                    disabled={!isConnected || formik.isSubmitting || !formik.dirty || !formik.isValid}
                    type='submit'
            >
                Send
            </Button>
        </form>
    );
}