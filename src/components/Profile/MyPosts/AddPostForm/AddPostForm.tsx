import React from 'react';
import {FormikHelpers, FormikProvider, useFormik} from 'formik';
import {createFieldF, formikField} from '../../../../Common/FormComponents/FieldsComponentsFormik';
import {maxLengthCreator, minLengthCreator, required, validatorCreator} from '../../../../utils/validators';
import Button from '@material-ui/core/Button';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useDispatch} from 'react-redux';
import {profileActions} from '../../../../reducers/profileReducer';

type propsType = {
    blockWidth: string
};

type formDataType = {
    newPost: string
}

type fieldNamesType = keyof formDataType;

let minLength2 = minLengthCreator(2);
let maxLength50 = maxLengthCreator(50);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        newPostForm: {
            display: 'flex',
            flexDirection: 'column',
            '& > *': {
                display: 'flex',
                margin: theme.spacing(1),
            },
        },
        stretched: {
            flexGrow: 1,
        }
    }),
);

/**
 * Returns form for adding new post with one multiline input and one button.
 * @param {mapDispatchPropsType} props - callback for adding new post.
 * @constructor
 */
export const AddPostForm: React.FC<propsType> = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    function onSubmit(values: formDataType, {setSubmitting, resetForm}: FormikHelpers<formDataType>) {
        dispatch(profileActions.sendPost(values.newPost));
        setSubmitting(false);
        resetForm();
    }

    const formik = useFormik({
        initialValues: {newPost: ''},
        enableReinitialize: true,
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit} className={classes.newPostForm} style={{maxWidth: props.blockWidth}}>
            <FormikProvider value={formik}>
                {createFieldF<fieldNamesType>(
                    classes.stretched,
                    'Type something',
                    'newPost',
                    formikField,
                    validatorCreator([required, minLength2, maxLength50]),
                    {multiline: true}
                )}
            </FormikProvider>
            <div>
                <Button variant='contained'
                        color='primary'
                        type='submit'
                        disabled={formik.isSubmitting || !formik.dirty || !formik.isValid}
                >
                    Add Post
                </Button>
            </div>
        </form>
    );
}