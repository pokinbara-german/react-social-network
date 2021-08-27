/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import styles from './MyPosts.module.css';
import Post from './Post/Post';
import {maxLengthCreator, minLengthCreator, required, validatorCreator} from "../../../utils/validators";
import {postsDataType, stringOrNull} from '../../../types';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import {createStyles, Theme, makeStyles} from '@material-ui/core/styles';
import {FormikHelpers, FormikProvider, useFormik} from 'formik';
import {createFieldF, formikField} from '../../../Common/FormComponents/FieldsComponentsFormik';

export type mapStatePropsType = {
    postsData: Array<postsDataType>,
    avatar: stringOrNull
}

export type mapDispatchPropsType = {
    sendPost: (newPost: string) => void
}

type ownPropsType = {
};

type propsType = mapStatePropsType & mapDispatchPropsType & ownPropsType;

type formDataType = {
    newPost: string
}

type fieldNamesType = keyof formDataType;

/**
 * @const
 * @type string
 * @description block max width.
 */
const maxWidth = '40ch';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        postsList: {
            width: '100%',
            maxWidth: maxWidth,
            backgroundColor: theme.palette.background.paper,
        },
        newPostForm: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: maxWidth,
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

let minLength2 = minLengthCreator(2);
let maxLength50 = maxLengthCreator(50);

/**
 * Component with title, form and list of posts.
 * @param {propsType} props
 * @constructor
 */
const MyPosts: React.FC<propsType> = (props) => {
    const classes = useStyles();

    let posts = props.postsData.map( (post) =>
        <Post key={'MyPost' +post.id} postId={post.id} message={post.text} likeCount={post.likes}  avatar={props.avatar}/>
    );

    return (
        <div className={styles.postBlock}>
            <h3>Posts</h3>
            <AddPostForm sendPost={props.sendPost}/>
            <List className={classes.postsList}>
                {posts}
            </List>
        </div>
    );
};

/**
 * Returns form for adding new post with one multiline input and one button.
 * @param {mapDispatchPropsType} props - callback for adding new post.
 * @constructor
 */
const AddPostForm: React.FC<mapDispatchPropsType> = (props) => {
    const classes = useStyles();

    function onSubmit(values: formDataType, {setSubmitting, resetForm}: FormikHelpers<formDataType>) {
        props.sendPost(values.newPost);
        setSubmitting(false);
        resetForm();
    }

    const formik = useFormik({
        initialValues: {newPost: ''},
        enableReinitialize: true,
        onSubmit,
    });

    return(
        <form onSubmit={formik.handleSubmit} className={classes.newPostForm}>
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

export default MyPosts;