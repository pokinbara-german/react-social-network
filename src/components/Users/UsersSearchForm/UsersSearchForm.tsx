import {filterType} from '../../../reducers/usersReducer';
import React from 'react';
import {FormikHelpers, useFormik} from 'formik';
import {useSelector} from 'react-redux';
import {getUsersFilterSelector} from '../../../Common/Selectors/Selectors';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {createStyles, makeStyles, Theme} from '@material-ui/core';
import {routes} from '../../../Common/Routes';

type propsType = {
    onPageChanged: (filter?: filterType) => void
}

type formFieldsType = {
    searchTerm: string,
    friend: 'null' | 'true' | 'false'
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        searchButton: {
            alignSelf: 'center',
        }
    }),
);

export const UsersSearchForm: React.FC<propsType> = (props) => {
    const classes = useStyles();
    const filter = useSelector(getUsersFilterSelector);

    /**
     * Process form-data to needed format and call API.
     * @param {formFieldsType} values object with data from form.
     * @param {boolean} setSubmitting set isSubmitting form.
     */
    function onSubmit(values: formFieldsType, {setSubmitting}: FormikHelpers<formFieldsType>) {
        const filter: filterType = {
            searchTerm: values.searchTerm || null,
            friend: values.friend === 'null' ? null : values.friend === 'true'
        }
        props.onPageChanged(filter);
        setSubmitting(false);
    }

    const formik = useFormik({
        initialValues: {searchTerm: filter.searchTerm, friend: String(filter.friend)} as formFieldsType,
        enableReinitialize: true,
        onSubmit: onSubmit,
    });

    return (
        <div>
            <h1>{routes.users.title}</h1>
                <form onSubmit={formik.handleSubmit} className={classes.root}>
                    <TextField label="Enter user name or it's part"
                               name='searchTerm'
                               value={formik.values.searchTerm}
                               onChange={formik.handleChange}
                    />
                    <Select name='friend'
                            value={formik.values.friend}
                            onChange={formik.handleChange}
                    >
                        <MenuItem value='null'>All</MenuItem>
                        <MenuItem value='true'>Only followed</MenuItem>
                        <MenuItem value='false'>Only unfollowed</MenuItem>
                    </Select>
                    <Button className={classes.searchButton}
                            color='primary'
                            variant='contained'
                            type='submit'
                            disabled={formik.isSubmitting || !formik.dirty}
                    >
                        Submit
                    </Button>
                </form>
        </div>
    );
}

export default UsersSearchForm;